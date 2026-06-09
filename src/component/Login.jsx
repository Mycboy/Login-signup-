import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = e.nativeEvent?.submitter?.name || 'submit'
    // For demo purposes we just log/alert the values
    console.log(action, form)
    alert(`${action === 'login' ? 'Login' : 'Signup'} submitted:\n` + JSON.stringify(form, null, 2))
  }

  return (
    <div className="login-wrap">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-header">Welcome</h2>

        <input
          className="login-input"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          className="login-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          className="login-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="login-actions">
          <button type="submit" name="login" className="btn login-btn">Login</button>
          <button type="submit" name="signup" className="btn signup-btn">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default Login