import React, { useState } from 'react'
import './Login.css'
import email from './asset/email.png'
import password from './asset/padlock.png'
import username from './asset/user.png'

const Login = () => {
  const [action,setAction] = useState('Login')

  return (
    <>
    <div className="login-wrap">
        <div className="header">
        <div  className={action === 'Signup' ? 'header' : 'header active'} onClick={() => setAction('Login')}>Login</div>
        <div className="header active">/</div>
          <div className={action === 'Login' ? 'header' : 'header active'} onClick={() => setAction('Signup')}>Signup</div>
        </div>
        <div className="Inputs">

        {action === 'Login' ? <div className="input">
            <img src={username} alt="" />
            <input type="text" placeholder="Username" required />
        </div> : ''}

        <div className="input">
            <img src={email} alt="" />
            <input type="email" placeholder="Email" required />
        </div>

         <div className="input">
            <img src={password} alt="" />
            <input type="password" placeholder="Password" required />
        </div>
        {action === 'Signup' ? <div className="input">
            <img src={password} alt="" />
            <input type="password" placeholder="Confirm Password" required />
        </div> : ''}
        {action === 'Signup' ? '':<div className="remember-me">Forgot password?</div>}
        </div>
        <div className="login-actions">
          <div  className="btn">{action === 'Login' ? 'Login' : 'Signup'}</div>
        </div>
    </div>
    </>
  )
}

export default Login