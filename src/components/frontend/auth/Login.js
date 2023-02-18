import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './login.css';
function Login() {
  const navigate = useNavigate()
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
    
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/login', data).then(res => {
        if(res.data.success){
          localStorage.setItem('__rea_token', res.data.token);
          localStorage.setItem('__rea_auth_name', res.data.username);
          swal({title: 'Success', text: res.data.message, icon: 'success', timer: 2000, buttons: false,}) ;
          setTimeout(() => {
            if(res.data.role === 'admin'){
              navigate('/admin/dashboard');
            }
            else{
                 navigate('/');
            }
         
          }, "500");
          
        }else{
          if(res.data.status === 'validation-error'){
            setloginInput({...loginInput, error_list: res.data.errors })
          }
          else{
            swal({title: 'Error', text: res.data.message, icon: 'error', timer: 2000, buttons: false, });
            setloginInput({...loginInput, isLoading: false, error_list: []})
          }
        }
        // setloginInput({...loginInput, isLoading: false})
      });
    });
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
                <label>Email</label>
                <input onChange={handleInput} value={loginInput.email} type="email" name="email"  placeholder="Email"/>
                <span className='text-danger'>{loginInput.error_list.email}</span>
              </div>

              <div>
                <label>Password</label>
                <input onChange={handleInput} value={loginInput.password} type="password" id="password" name="password" placeholder="Password"/>
                <span className='text-danger'>{loginInput.error_list.password}</span>
              </div>

              <div>
                <input className="button" type="submit" value="Sign In"/>
              </div>
              {loginInput.isLoading && 
                <div className="from-submit-loader text-center">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }  
            </form>

          </div>

          <svg xmlns="http://www.w3.org/2000/svg" className="icons">

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