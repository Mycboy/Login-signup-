import { useState } from 'react'
import Login from './component/Login'
import Dashboard from './component/Dashboard'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  )
}

export default App
