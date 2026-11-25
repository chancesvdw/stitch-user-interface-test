import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialOrder, restaurant } from '../data/menu'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(initialOrder)
  const [orderMode, setOrderMode] = useState('dinein')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [gratuity, setGratuity] = useState(18)
  const [ecoCutlery, setEcoCutlery] = useState(true)
  const [coursedService, setCoursedService] = useState(true)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (!toastMessage) return undefined
    const timer = setTimeout(() => setToastMessage(''), 2500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const showToast = (message) => setToastMessage(message)

  const addItem = (item, size, quantity = 1) => {
    const key = `${item.id}-${size.name}`
    setOrder((current) => {
      const existing = current.find((line) => line.key === key)
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [
        ...current,
        {
          key,
          itemId: item.id,
          name: item.name,
          size: size.name,
          sizeLabel:
            size.name === 'Regular Size' || size.name === 'Standard Bottle'
              ? size.name
              : `Size: ${size.name}`,
          price: size.price,
          quantity,
          image: item.reviewImage || item.image || null,
          badge: item.badge || null,
          tag: item.tag || '',
        },
      ]
    })
    showToast(`${item.name} added to your order`)
  }

  const updateQuantity = (key, delta) => {
    setOrder((current) =>
      current
        .map((line) =>
          line.key === key
            ? { ...line, quantity: Math.max(0, line.quantity + delta) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    )
  }

  const removeItem = (key) => {
    setOrder((current) => current.filter((line) => line.key !== key))
  }

  const clearOrder = () => {
    setOrder([])
    setOrderSubmitted(false)
    showToast('Your order has been cleared')
  }

  const totals = useMemo(() => {
    const subtotal = order.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    )
    const portions = order.reduce((sum, line) => sum + line.quantity, 0)
    return {
      subtotal,
      portions,
      itemCount: order.length,
      tax: subtotal * 0.085,
      menuService: subtotal * 0.1,
      tip: subtotal * (gratuity / 100),
      menuTotal: subtotal * 1.185,
      checkoutTotal: subtotal * (1 + 0.085 + gratuity / 100),
    }
  }, [order, gratuity])

  const orderTypeLabel =
    orderMode === 'dinein'
      ? `${restaurant.table} (Dine-In)`
      : 'Takeout Express • Curbside Pickup'

  const value = {
    order,
    orderMode,
    setOrderMode,
    notes,
    setNotes,
    paymentMethod,
    setPaymentMethod,
    gratuity,
    setGratuity,
    ecoCutlery,
    setEcoCutlery,
    coursedService,
    setCoursedService,
    orderSubmitted,
    setOrderSubmitted,
    toastMessage,
    showToast,
    addItem,
    updateQuantity,
    removeItem,
    clearOrder,
    totals,
    orderTypeLabel,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrder must be used inside OrderProvider')
  }
  return context
}
