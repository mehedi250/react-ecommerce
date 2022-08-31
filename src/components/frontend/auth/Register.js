import React from 'react'

function Register() {
  return (
    <div className="login-container">
      <div className="align container">
        <div className="login">
          <header className="login__header">
            <h2>
              <svg   className="icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
           
              Register
            </h2>
          </header>

          <form action="#" className="login__form" method="POST">
            <div>
              <label for="email">Full Name</label>
              <input type="text" placeholder="name"/>
            </div>

            <div>
              <label for="email">E-mail address</label>
              <input type="email" placeholder="email"/>
            </div>

            <div>
              <label for="password">Password</label>
              <input type="password" placeholder="password"/>
            </div>

            <div>
              <label for="password">Confourm Password</label>
              <input type="password" placeholder="password"/>
            </div>

            <div>
              <input className="button" type="submit" value="Register"/>
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
  )
}

export default Register