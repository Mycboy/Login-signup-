import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [action,setAction] = useState('Login')

  return (
    <>
    <div className="login-wrap">
        <div className="login-header">{action === 'Login' ? 'Login' : 'Signup'}</div>
        <div className="Inputs">

        {action === 'Login' ? <div className="input">
            <input type="text" placeholder="Username" required />
        </div> : ''}

        <div className="input">
            <input type="email" placeholder="Email" required />
        </div>

         <div className="input">
            <input type="password" placeholder="Password" required />
        </div>
        {action === 'Signup' ? <div className="input">
            <input type="password" placeholder="Confirm Password" required />
        </div> : ''}
        {action === 'Signup' ? '':<div className="remember-me">Forgot password?</div>}
        </div>
        <div className="login-actions">
          <div  className={action === 'Signup' ? 'btn' : 'btn active'} onClick={() => setAction('Login')}>Login</div>
          <div className={action === 'Login' ? 'btn' : 'btn active'} onClick={() => setAction('Signup')}>Signup</div>
        </div>
    </div>
    </>
  )
}

export default Login