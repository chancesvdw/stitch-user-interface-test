import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import MenuPage from './pages/MenuPage'
import CheckoutPage from './pages/CheckoutPage'
import { OrderProvider } from './context/OrderContext'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return undefined
    }
    const timer = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <OrderProvider>
      <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <ScrollToHash />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
        <Toast />
      </div>
    </OrderProvider>
  )
}
