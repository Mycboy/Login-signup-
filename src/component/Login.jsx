import React, { useState } from 'react'
import './Login.css'
import email from './asset/email.png'
import password from './asset/padlock.png'
import username from './asset/user.png'

const Login = ({ onLogin }) => {
  const [action, setAction] = useState('Login')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin) onLogin()
  }

  return (
    <div className="login-page">
      <div className="login-wrap">
        <div className="login-brand">
          <div className="brand-mark">⚡</div>
          <div>
            <div className="brand-name">PokéVault</div>
            <div className="brand-tag">Collector marketplace</div>
          </div>
        </div>

        <div className="login-header">
          <button
            type="button"
            className={action === 'Login' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setAction('Login')}
          >
            Login
          </button>
          <button
            type="button"
            className={action === 'Signup' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setAction('Signup')}
          >
            Signup
          </button>
        </div>

        <form className="Inputs" onSubmit={handleSubmit}>
          {action === 'Login' && (
            <div className="input">
              <img src={username} alt="" />
              <input type="text" placeholder="Username" required />
            </div>
          )}

          <div className="input">
            <img src={email} alt="" />
            <input type="email" placeholder="Email" required />
          </div>

          <div className="input">
            <img src={password} alt="" />
            <input type="password" placeholder="Password" required />
          </div>

          {action === 'Signup' && (
            <div className="input">
              <img src={password} alt="" />
              <input type="password" placeholder="Confirm Password" required />
            </div>
          )}

          {action === 'Signup' ? null : <div className="remember-me">Forgot password?</div>}

          <button type="submit" className="btn">
            {action === 'Login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login