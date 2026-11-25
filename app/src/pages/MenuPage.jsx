import { useState } from 'react'
import { menuCategories } from '../data/menu'
import { useOrder } from '../context/OrderContext'
import Icon from '../components/Icon'
import MenuItemCard from '../components/MenuItemCard'
import OrderSummary from '../components/OrderSummary'

export default function MenuPage() {
  const { orderMode, setOrderMode } = useOrder()
  const [activeCategory, setActiveCategory] = useState('pizzas')

  const scrollToCategory = (id) => {
    setActiveCategory(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        <section className="w-full bg-surface-container-low px-margin py-space-lg">
          <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs mb-1 text-secondary">
                <Icon className="text-[18px]">wb_twilight</Icon>
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                  Sun-Soaked Riviera Hearth
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                La Serena
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Fresh Coastal Mediterranean Kitchen • Handcrafted daily with DOP
                Sicilian olive oil &amp; local sea salt
              </p>
            </div>

            <div className="flex items-center bg-surface-container-highest p-1 rounded-full shadow-sm">
              <button
                type="button"
                onClick={() => setOrderMode('dinein')}
                className={`flex items-center gap-1.5 px-space-md py-2 rounded-full font-label-md text-label-md transition-all ${
                  orderMode === 'dinein'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="text-[16px]">restaurant</Icon>
                <span>Dine-In (Table 14)</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderMode('takeout')}
                className={`flex items-center gap-1.5 px-space-md py-2 rounded-full font-label-md text-label-md transition-all ${
                  orderMode === 'takeout'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className="text-[16px]">shopping_bag</Icon>
                <span>Takeout</span>
              </button>
            </div>
          </div>

          <div className="max-w-[1240px] mx-auto mt-space-md pt-space-sm">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToCategory(category.id)}
                  className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1240px] mx-auto px-margin py-space-lg w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-xl">
              {menuCategories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  className="flex flex-col gap-space-md scroll-mt-32"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                        {category.name}
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      {category.subtitle}
                    </span>
                  </div>

                  <div
                    className={
                      category.layout === 'row'
                        ? 'flex flex-col gap-space-md'
                        : category.layout === 'card'
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-space-md'
                          : 'grid grid-cols-1 md:grid-cols-3 gap-space-md'
                    }
                  >
                    {category.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        variant={category.layout}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  )
}
