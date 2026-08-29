import { useEffect, useState } from 'react'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Shop from './component/shop'
import Checkout from './component/checkout'
import Tracking from './component/Tracking'

const STORAGE_KEY = 'pokevault-orders'

const normalizeOrders = (value) => {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') return [value]
  return []
}

const App = () => {
  const [view, setView] = useState('login')
  const [selectedSeason, setSelectedSeason] = useState('kanto')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? normalizeOrders(JSON.parse(saved)) : []
    } catch {
      return []
    }
  })
  const [checkoutOrigin, setCheckoutOrigin] = useState('shop')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleLogin = () => setView('dashboard')
  const handleLogout = () => setView('login')

  const handleSelectSeason = (seasonId) => {
    setSelectedSeason(seasonId)
    setView('shop')
  }

  const handleOpenCheckout = (origin = 'shop') => {
    setCheckoutOrigin(origin)
    setView('checkout')
  }

  const handleAddToCart = (card) => {
    const cardId = `${card.name}-${card.rarity}`

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === cardId)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === cardId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [
        ...currentCart,
        {
          ...card,
          id: cardId,
          quantity: 1
        }
      ]
    })
  }

  const handleUpdateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemoveFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const handlePlaceOrder = (orderData) => {
    const orderToSave = {
      ...orderData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    }

    setOrders((currentOrders) => [orderToSave, ...normalizeOrders(currentOrders)])
    setCart([])
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} />
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        onLogout={handleLogout}
        onSelectSeason={handleSelectSeason}
        onCheckout={() => handleOpenCheckout('dashboard')}
        onTrackOrder={() => setView('tracking')}
        cartCount={cartCount}
        hasOrders={orders.length > 0}
      />
    )
  }

  if (view === 'checkout') {
    return (
      <Checkout
        cartItems={cart}
        origin={checkoutOrigin}
        onBack={() => setView(checkoutOrigin)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
        onTrackOrder={() => setView('tracking')}
      />
    )
  }

  if (view === 'tracking') {
    return <Tracking orders={orders} onBack={() => setView(checkoutOrigin)} />
  }

  return (
    <Shop
      seasonId={selectedSeason}
      onBack={() => setView('dashboard')}
      cartCount={cartCount}
      cartItems={cart}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
      onUpdateQuantity={handleUpdateQuantity}
      onCheckout={() => handleOpenCheckout('shop')}
    />
  )
}

export default App
