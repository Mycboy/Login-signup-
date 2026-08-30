import { useEffect, useState } from 'react'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Shop from './component/shop'
import Collection from './component/Collection'
import Checkout from './component/checkout'
import Tracking from './component/Tracking'
import AdminDashboard from './Admin'
import { API_BASE } from './api'

const App = () => {
  const [view, setView] = useState('login')
  const [selectedSeason, setSelectedSeason] = useState('kanto')
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [checkoutOrigin, setCheckoutOrigin] = useState('shop')
  const [trackOrigin, setTrackOrigin] = useState('shop')
  const [collectionQuery, setCollectionQuery] = useState('')
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
    if (!authToken || !user) return

    setView(user.role === 'admin' ? 'admin' : 'dashboard')
  }, [authToken, user])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/products`)
        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!authToken) {
      setOrders([])
      return
    }

    const normalizeOrder = (order) => {
      const id = order?._id || order?.id
      return { ...order, id, _id: id }
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
        setOrders(Array.isArray(data) ? data.map(normalizeOrder) : [])
      } catch (error) {
        console.error(error)
        setOrders([])
      }
    }

    fetchOrders()
  }, [authToken])

  const productsBySeason = products.reduce((acc, product) => {
    const seasonKey = (product.season || product.category || 'kanto').toLowerCase()
    if (!acc[seasonKey]) acc[seasonKey] = []
    acc[seasonKey].push({
      ...product,
      id: product._id || product.id,
      image: product.image || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
      detail: product.description || 'Premium Pokémon card',
      price: product.price,
      stock: product.stock ?? 1
    })
    return acc
  }, {})

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleAuthSuccess = (userData) => {
    const normalizedUser = {
      ...userData,
      role: userData.role || 'user'
    }

    setUser(normalizedUser)
    setAuthToken(userData.token)
    localStorage.setItem('pokevault-user', JSON.stringify(normalizedUser))
    localStorage.setItem('pokevault-token', userData.token)

    if (normalizedUser.role === 'admin') {
      setView('admin')
      return
    }

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

  const handleOpenCollection = (query = '') => {
    setCollectionQuery(query)
    setView('collection')
  }

  const handleTrackOrder = (origin = 'shop') => {
    setTrackOrigin(origin)
    setView('tracking')
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
      const normalizedOrder = {
        ...savedOrder,
        id: savedOrder._id || savedOrder.id,
        _id: savedOrder._id || savedOrder.id
      }

      setOrders((currentOrders) => [normalizedOrder, ...currentOrders])
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

  if (view === 'admin') {
    return (
      <AdminDashboard
        user={user}
        token={authToken}
        onLogout={handleLogout}
      />
    )
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        onLogout={handleLogout}
        onSelectSeason={handleSelectSeason}
        onOpenCollection={handleOpenCollection}
        onCheckout={() => handleOpenCheckout('dashboard')}
        onTrackOrder={() => handleTrackOrder('shop')}
        cartCount={cartCount}
        hasOrders={orders.length > 0}
      />
    )
  }

  if (view === 'collection') {
    return (
      <Collection
        query={collectionQuery}
        cards={products}
        onBack={() => setView('dashboard')}
        onAddToCart={handleAddToCart}
        onCheckout={() => handleOpenCheckout('shop')}
        cartCount={cartCount}
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
        onTrackOrder={() => handleTrackOrder(checkoutOrigin)}
      />
    )
  }

  if (view === 'tracking') {
    return <Tracking orders={orders} onBack={() => setView(trackOrigin)} />
  }

  return (
    <Shop
      seasonId={selectedSeason}
      cards={productsBySeason[selectedSeason] || []}
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
