import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { registerApi } from '../../../service/serviceApi';

function Register() {
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    error_list: [],
    isLoading: false
  })

  const handleInput = (e) =>{
    e.persist();
    setRegister({...registerInput, [e.target.name]: e.target.value})
  }

  const registerSubmit = (e) =>{
    e.preventDefault();
    setRegister({...registerInput, isLoading: true})
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation
    }
    // console.log(res)
    registerApi(data).then((response) => {
      console.log(response)
      if(response.data.success){

      }
      else{
          if(response.data.status === 'validation-error'){
                  setRegister({...registerInput, error_list: response.data.errors })
           }
      }
    })
    .catch(error=>{
        console.log("LandingPop", error)
    });

    // axios.get('/sanctum/csrf-cookie').then(response => {
    //   axios.post('/api/register', data).then(res => {
    //     if(res.data.success){

    //     }else{
    //       if(res.data.status === 'validation-error'){
    //         setRegister({...registerInput, error_list: res.data.errors })
    //       }
    //     }
    //   });
    // });

    
    
  }
  return (
    <div className="login-container">
      <div className="align container">
        <div className="login">
          <header className="login__header">
            <h2>
              <svg   className="icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
              Register
            </h2>
          </header>

          <form onSubmit={registerSubmit} className="login__form">
            <div>
              <label>Full Name</label>
              <input type="text" name='name' onChange={handleInput} value={registerInput.name} placeholder="Name"/>
              <span className='text-danger'>{registerInput.error_list.name}</span>
            </div>

            <div>
              <label>Email</label>
              <input type="email" name='email' onChange={handleInput} value={registerInput.email} placeholder="Email"/>
              <span className='text-danger'>{registerInput.error_list.email}</span>
            </div>

            <div>
              <label>Password</label>
              <input type="password" name='password' onChange={handleInput} value={registerInput.password} placeholder="Password"/>
              <span className='text-danger'>{registerInput.error_list.password}</span>
            </div>

            <div>
              <label>Confirm Password</label>
              <input type="password" name='password_confirmation' onChange={handleInput} value={registerInput.password_confirmation} placeholder="Confirm password"/>
              <span className='text-danger'>{registerInput.error_list.password_confirmation}</span>
            </div>

            <div>
              <input className="button" type="submit" value="Register"/>
            </div>
          </form>

        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="icons">

          <symbol id="icon-lock" viewBox="0 0 448 512">
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
          </symbol>

        </svg>

      </div>
    </div>
  )
}

export default Register