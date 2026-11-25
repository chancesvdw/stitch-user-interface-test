// Menu content and the starting table order.
// Change prices, names or descriptions here and every page updates.

export const menuCategories = [
  {
    id: 'pizzas',
    name: 'Pizzas',
    subtitle: 'Wood-Fired Hearth',
    layout: 'row',
    items: [
      {
        id: 'pepperoni-pizza',
        name: 'Pepperoni Pizza',
        description:
          'Artisanal pepperoni, crushed San Marzano tomato sauce, fresh mozzarella.',
        image: '/images/pizza-menu.jpg',
        reviewImage: '/images/pepperoni-review.jpg',
        badge: 'Hearth',
        tag: 'Woodfired',
        sizes: [
          { name: 'Large', label: 'Large ($12.95)', price: 12.95 },
          { name: 'Medium', label: 'Medium ($10.00)', price: 10 },
          { name: 'Small', label: 'Small ($7.00)', price: 7 },
        ],
      },
      {
        id: 'cheese-pizza',
        name: 'Cheese Pizza',
        description:
          'Campanian buffalo mozzarella, rich tomato sugo, fresh basil, extra virgin olive oil.',
        image: '/images/pizza-menu.jpg',
        reviewImage: '/images/pizza-menu.jpg',
        sizes: [
          { name: 'Large', label: 'Large ($10.95)', price: 10.95 },
          { name: 'Medium', label: 'Medium ($9.25)', price: 9.25 },
          { name: 'Small', label: 'Small ($6.50)', price: 6.5 },
        ],
      },
      {
        id: 'eggplant-pizza',
        name: 'Eggplant Pizza',
        description:
          'Roasted marinated eggplant, garlic ricotta, toasted pine nuts, oregano, tomato reduction.',
        image: '/images/eggplant-pizza.jpg',
        reviewImage: '/images/eggplant-pizza.jpg',
        sizes: [
          { name: 'Large', label: 'Large ($11.95)', price: 11.95 },
          { name: 'Medium', label: 'Medium ($9.75)', price: 9.75 },
          { name: 'Small', label: 'Small ($6.75)', price: 6.75 },
        ],
      },
    ],
  },
  {
    id: 'sides',
    name: 'Sides',
    subtitle: 'Fresh & Crispy',
    layout: 'card',
    items: [
      {
        id: 'fries',
        name: 'Fries',
        description: 'Hand-cut golden potatoes seasoned with sea salt and herbs.',
        image: '/images/fries-menu.jpg',
        reviewImage: '/images/fries-review.jpg',
        badge: 'Crisp & Golden',
        tag: 'Crispy',
        sizes: [
          { name: 'Large', label: 'Large ($4.50)', price: 4.5 },
          { name: 'Small', label: 'Small ($3.50)', price: 3.5 },
        ],
      },
      {
        id: 'greek-salad',
        name: 'Greek Salad',
        description:
          'Crisp cucumbers, vine-ripened tomatoes, Kalamata olives, authentic feta, and Greek oregano.',
        image: '/images/greek-salad-menu.jpg',
        reviewImage: '/images/greek-salad-review.jpg',
        badge: 'Fresh Salad',
        tag: 'Vegetarian',
        sizes: [{ name: 'Regular Size', label: 'Single Size Portion', price: 7.25 }],
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    subtitle: 'Chilled Refreshments',
    layout: 'compact',
    items: [
      {
        id: 'coke',
        name: 'Coke',
        description: 'Classic chilled Coca-Cola served with ice.',
        image: '/images/coke.jpg',
        reviewImage: '/images/coke.jpg',
        tag: 'Chilled',
        sizes: [
          { name: 'Large', label: 'Large ($3.00)', price: 3 },
          { name: 'Med', label: 'Med ($2.00)', price: 2 },
          { name: 'Sm', label: 'Sm ($1.00)', price: 1 },
        ],
      },
      {
        id: 'sprite',
        name: 'Sprite',
        description: 'Crisp lemon-lime soda served chilled over ice.',
        image: '/images/coke.jpg',
        reviewImage: '/images/coke.jpg',
        tag: 'Chilled',
        sizes: [
          { name: 'Large', label: 'Large ($3.00)', price: 3 },
          { name: 'Med', label: 'Med ($2.00)', price: 2 },
          { name: 'Sm', label: 'Sm ($1.00)', price: 1 },
        ],
      },
      {
        id: 'bottled-water',
        name: 'Bottled Water',
        description: 'Natural artisan mineral spring water bottle.',
        image: '/images/coke.jpg',
        reviewImage: '/images/coke.jpg',
        tag: 'Mineral',
        sizes: [{ name: 'Standard Bottle', label: 'Standard Bottle', price: 5 }],
      },
    ],
  },
]

export const winePairing = {
  id: 'vermentino-glass',
  name: 'Vermentino di Sardegna',
  description: 'A chilled glass recommended by the sommelier.',
  price: 16,
  image: null,
  reviewImage: null,
  badge: 'Pairing',
  tag: 'Sommelier',
  sizes: [{ name: 'Glass', label: 'Glass ($16.00)', price: 16 }],
}

export const initialOrder = [
  {
    key: 'pepperoni-pizza-Large',
    itemId: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    size: 'Large',
    sizeLabel: 'Size: Large',
    price: 12.95,
    quantity: 1,
    image: '/images/pepperoni-review.jpg',
    badge: 'Hearth',
    tag: 'Woodfired',
  },
  {
    key: 'greek-salad-Regular Size',
    itemId: 'greek-salad',
    name: 'Greek Salad',
    size: 'Standard Serving',
    sizeLabel: 'Regular Size',
    price: 7.25,
    quantity: 1,
    image: '/images/greek-salad-review.jpg',
    badge: 'Fresh',
    tag: 'Vegetarian',
  },
  {
    key: 'coke-Med',
    itemId: 'coke',
    name: 'Coke',
    size: 'Medium',
    sizeLabel: 'Size: Medium',
    price: 2,
    quantity: 2,
    image: '/images/coke.jpg',
    badge: null,
    tag: 'Chilled',
  },
  {
    key: 'fries-Small',
    itemId: 'fries',
    name: 'Fries',
    size: 'Small',
    sizeLabel: 'Size: Small',
    price: 3.5,
    quantity: 1,
    image: '/images/fries-review.jpg',
    badge: 'Side',
    tag: 'Crispy',
  },
]

export const restaurant = {
  name: 'La Serena',
  tagline: 'Mediterranean Table',
  table: 'Table 14 — Seaside Patio',
  phone: '+1 (800) 555-DINE',
  phoneHref: 'tel:+18005553284',
  email: 'ciao@laserenatable.com',
  address: 'Via della Marina 24, Coastal Pavilion',
}
