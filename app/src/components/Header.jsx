import { Link, useLocation } from 'react-router-dom'
import { restaurant } from '../data/menu'
import { useOrder } from '../context/OrderContext'
import Icon from './Icon'

const navLinks = [
  { label: 'Menu', to: '/', match: '/' },
  { label: 'Wine & Cellar', to: '/checkout#pairing', match: 'wine' },
  { label: "Chef's Tasting", to: '/#pizzas', match: 'chef' },
  { label: 'My Table', to: '/#order', match: 'table' },
]

export default function Header() {
  const location = useLocation()
  const { totals, orderMode } = useOrder()
  const onCheckout = location.pathname === '/checkout'

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-surface-container-low py-1.5 px-margin hidden md:block">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
          <div>
            <span>Open Daily: 12:00 PM – 11:00 PM</span>
            <span className="mx-2">•</span>
            <span>Kitchen closes at 10:30 PM</span>
          </div>
          <div>
            <span>Reservations &amp; Assistance:</span>
            <a
              className="ml-1.5 text-primary hover:text-primary-container font-medium transition-colors"
              href={restaurant.phoneHref}
            >
              {restaurant.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="h-20 max-w-[1240px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-md">
          <Link to="/" className="flex flex-col">
            <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none">
              {restaurant.name}
            </span>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mt-0.5">
              {restaurant.tagline}
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-2 pl-space-lg">
            <div className="flex items-center gap-1.5 bg-surface-container py-1.5 px-3 rounded-full text-on-surface">
              <Icon className="text-[16px] text-secondary">restaurant</Icon>
              <span className="font-label-md text-label-md">
                {orderMode === 'dinein'
                  ? restaurant.table
                  : 'Takeout Express'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary-container py-1.5 px-2.5 rounded-full text-on-secondary-fixed">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase">
                Order Live
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 p-1 bg-surface-container-low rounded-full">
          {navLinks.map((link) => {
            const isMenuActive = link.match === '/' && !onCheckout
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={isMenuActive ? 'page' : undefined}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                  isMenuActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-full">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center font-label-sm text-label-sm ${
                  onCheckout
                    ? 'bg-surface-container-highest text-on-surface-variant'
                    : 'bg-primary text-on-primary'
                }`}
              >
                1
              </div>
              <span
                className={`font-label-sm text-label-sm uppercase ${
                  onCheckout ? 'text-on-surface-variant' : 'text-on-surface'
                }`}
              >
                Select
              </span>
            </div>
            <span className="text-outline-variant font-label-sm">→</span>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center font-label-sm text-label-sm ${
                  onCheckout
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                2
              </div>
              <span
                className={`font-label-sm text-label-sm uppercase ${
                  onCheckout ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                Pay
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            aria-label="View order and checkout"
            className="relative p-2.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center"
          >
            <Icon className="text-[20px]">shopping_bag</Icon>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-on-primary font-label-sm text-label-sm rounded-full flex items-center justify-center font-bold">
              {totals.itemCount}
            </span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon className="text-on-primary text-[18px]">person</Icon>
          </div>
        </div>
      </div>
    </header>
  )
}
