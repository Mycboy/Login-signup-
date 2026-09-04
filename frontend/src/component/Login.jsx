import React, { useState } from 'react'
import './Login.css'
import email from './asset/email.png'
import password from './asset/padlock.png'
import username from './asset/user.png'
import { API_BASE } from '../api'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Login = ({ onAuthSuccess }) => {
  const [action, setAction] = useState('Login')
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const endpoint = action === 'Login' ? '/auth/login' : '/auth/signup'
      const payload =
        action === 'Login'
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword
            }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        // Non-JSON response
      }

      if (!response.ok) {
        const fullUrl = `${API_BASE}${endpoint}`
        throw new Error(
          data.message ||
          data.error ||
          `Server error ${response.status} from: ${fullUrl}. Check your Vercel VITE_API_BASE setting and Render backend status.`
        )
      }

      if (onAuthSuccess) {
        onAuthSuccess(data)
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check network connection.')
    } finally {
      setIsSubmitting(false)
    }
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
          {action === 'Signup' && (
            <div className="input">
              <img src={username} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
          )}

          <div className="input">
            <img src={email} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
          </div>

          {action === 'Signup' && (
            <div className="input">
              <img src={password} alt="" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                required
              />
            </div>
          )}

          {action === 'Signup' ? null : <div className="remember-me">Forgot password?</div>}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : action === 'Login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login