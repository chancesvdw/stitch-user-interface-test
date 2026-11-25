import { Link } from 'react-router-dom'
import { restaurant } from '../data/menu'

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface">
      <div className="max-w-[1240px] mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-xl">
          <div>
            <div className="font-headline-md text-headline-md text-primary mb-2">
              {restaurant.name}
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
              Coastal Mediterranean gastronomy crafted with lineage ingredients,
              slow fire, and fresh cold-pressed olive oils.
            </p>
            <div className="flex gap-2">
              <span className="bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase px-2.5 py-1 rounded-full">
                Organic DOP
              </span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm uppercase px-2.5 py-1 rounded-full">
                Slow Food
              </span>
            </div>
          </div>

          <div>
            <div className="font-label-md text-label-md uppercase text-on-surface font-semibold mb-space-sm">
              Service &amp; Hours
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>Lunch: 12:00 PM – 3:30 PM</li>
              <li>Aperitivo: 4:00 PM – 6:30 PM</li>
              <li>Dinner: 6:30 PM – 11:00 PM</li>
              <li className="text-primary font-medium pt-1">
                Table Service to Patrons
              </li>
            </ul>
          </div>

          <div>
            <div className="font-label-md text-label-md uppercase text-on-surface font-semibold mb-space-sm">
              Patio &amp; Cellar
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>Seaside Terrace &amp; Solarium</li>
              <li>Biodynamic Italian Wines</li>
              <li>Artisanal Pasta Lab</li>
              <li>Woodfired Hearth</li>
            </ul>
          </div>

          <div>
            <div className="font-label-md text-label-md uppercase text-on-surface font-semibold mb-space-sm">
              Concierge
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-xs">
              {restaurant.address}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-xs">
              <a className="hover:text-primary" href={restaurant.phoneHref}>
                {restaurant.phone}
              </a>
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <a
                className="hover:text-primary"
                href={`mailto:${restaurant.email}`}
              >
                {restaurant.email}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <div>© 2025 La Serena Mediterranean Table. All rights reserved.</div>
          <div className="flex items-center gap-space-md">
            <Link className="hover:text-on-surface transition-colors" to="/#order">
              Dietary &amp; Allergens Guide
            </Link>
            <Link className="hover:text-on-surface transition-colors" to="/#pizzas">
              Kitchen Provenance
            </Link>
            <Link className="hover:text-on-surface transition-colors" to="/">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
