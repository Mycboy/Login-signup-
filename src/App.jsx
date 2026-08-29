import { useEffect, useState } from 'react'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Shop from './component/shop'
import Checkout from './component/checkout'
import Tracking from './component/Tracking'
import { API_BASE } from './api'

const App = () => {
  const [view, setView] = useState('login')
  const [selectedSeason, setSelectedSeason] = useState('kanto')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [checkoutOrigin, setCheckoutOrigin] = useState('shop')
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('pokevault-user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('pokevault-token') || '')

  useEffect(() => {
    if (authToken && user) {
      setView('dashboard')
    }
  }, [authToken, user])

  useEffect(() => {
    if (!authToken) {
      setOrders([])
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to load orders')
        }

        const data = await response.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setOrders([])
      }
    }

    fetchOrders()
  }, [authToken])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setAuthToken(userData.token)
    localStorage.setItem('pokevault-user', JSON.stringify(userData))
    localStorage.setItem('pokevault-token', userData.token)
    setView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setAuthToken('')
    localStorage.removeItem('pokevault-user')
    localStorage.removeItem('pokevault-token')
    setView('login')
  }

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

  const handlePlaceOrder = async (orderData) => {
    if (!authToken) {
      return
    }

    try {
      const payload = {
        ...orderData,
        customerName: user?.name || orderData.customerName,
        email: user?.email || orderData.email,
        status: 'Confirmed'
      }

      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Order submit failed')
      }

      const savedOrder = await response.json()
      setOrders((currentOrders) => [savedOrder, ...currentOrders])
      setCart([])
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  if (view === 'login') {
    return <Login onAuthSuccess={handleAuthSuccess} />
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
