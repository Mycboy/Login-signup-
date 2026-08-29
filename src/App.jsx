import { useState } from 'react'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Shop from './component/shop'

const App = () => {
  const [view, setView] = useState('login')
  const [selectedSeason, setSelectedSeason] = useState('kanto')
  const [cart, setCart] = useState([])

  const handleLogin = () => setView('dashboard')
  const handleLogout = () => setView('login')

  const handleSelectSeason = (seasonId) => {
    setSelectedSeason(seasonId)
    setView('shop')
  }

  const handleAddToCart = (card) => {
    setCart((currentCart) => [
      ...currentCart,
      {
        ...card,
        id: `${card.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`
      }
    ])
  }

  const handleRemoveFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} />
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} onSelectSeason={handleSelectSeason} cartCount={cart.length} />
  }

  return (
    <Shop
      seasonId={selectedSeason}
      onBack={() => setView('dashboard')}
      cartCount={cart.length}
      cartItems={cart}
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
    />
  )
}

export default App
