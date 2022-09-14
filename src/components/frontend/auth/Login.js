import React, { useState } from 'react'

function Login() {
  const [loginInput, setloginInput] = useState({
    email: '',
    password: '',
    error_list: [],
    isLoading: false
  })

  const handleInput = (e) =>{
    e.persist();
    setloginInput({...loginInput, [e.target.name]: e.target.value})
  }
  const handleLogin = (e) =>{
    e.preventDefault();
    setloginInput({...loginInput, isLoading: true});
    const data = {
      email: loginInput.email,
      password: loginInput.password
    }
  }
  return (
    <>
      <div className="login-container">
        <div className="align container">
          <div className="login">
            <header className="login__header">
              <h2>
                <svg  className="icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20"><path d="M14 10L8 5v3H1v4h7v3l6-5zm3 7H9v2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H9v2h8v14z"/></svg>
                Sign In
              </h2>
            </header>

            <form onSubmit={handleLogin} className="login__form">
              <div>
                <label for="email">Email</label>
                <input onChange={handleInput} value={loginInput.email} type="email" id="email" name="email"  placeholder="Email"/>
                <span className='text-danger'>{loginInput.error_list.email}</span>
              </div>

              <div>
                <label for="password">Password</label>
                <input onChange={handleInput} value={loginInput.password} type="password" id="password" name="password" placeholder="Password"/>
                <span className='text-danger'>{loginInput.error_list.password}</span>
              </div>

              <div>
                <input className="button" type="submit" value="Sign In"/>
              </div>
            </form>

          </div>

          <svg xmlns="http://www.w3.org/2000/svg" class="icons">

            <symbol id="icon-lock" viewBox="0 0 448 512">
              <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
            </symbol>

          </svg>

        </div>
      </div>

    </>
    
  )
}

export default Login