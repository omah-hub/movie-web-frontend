import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom'
import './login.css'
import axios from 'axios'



function Login({ setName }) {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    // console.log('CHECK', data);
        try {

          const response = await axios.post('http://localhost:5000/api/login', data, {
            withCredentials: true,
          });
            console.log(response)
          
          const sessionId = response.data?.sessionId;
          const name = response.data?.name;
          const expirydate = response.data?.sessionExpiry
          
          console.log(expirydate)

          console.log('Session ID:', sessionId);
          console.log('Name:', name);

        
          // // Store session ID
          localStorage.setItem('name', name);
          sessionStorage.setItem('sessionId', sessionId);
          sessionStorage.setItem('expirydate', expirydate);
          setSuccessMessage('Login successful! Redirecting...');
          setErrorMessage('')
          setTimeout(() => {
            navigate('/');
          }, 2000);
            
        }catch (error) {
          // console.log(error)
          setErrorMessage(error.response?.data?.error || 'Registration Failed!');
          setSuccessMessage(''); // Clear success message
        }
        }
  return (
    <div className='login-container'>
        <p className='text'>Login</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{height: '100px'}}>
                <label htmlFor='name'>Name:</label>
                <input id='name' placeholder='Your username' {...register('name', {required: true})} />
                {errors.name && <p style={{color : 'red',fontStyle: 'italic', marginTop: '-10px', fontSize: '13px', fontWeight: 'bold'}}>Username is not correct</p>}
            </div>
            <div style={{height: '100px'}}>
                <label htmlFor='password'>Password:</label>
                <div style={{ position: 'relative'}}>
                <input id='password'  type={showPassword ? 'text' : 'password'} placeholder='*****' {...register('password', {required: true})} />
                <span onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}>
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
                </div>
                {errors.password && <p style={{color : 'red',fontStyle: 'italic', marginTop : '-10px', fontSize: '13px', fontWeight: 'bold'}}>password incorrect</p>}
            </div>

           <div className='button'>
           <button type='submit'>Login</button>
           </div>
           {successMessage && <div className="success-message">{successMessage}</div>}
           {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>

        <div>
        <p style={{ fontSize: '16px', color: 'white'}}>Click <Link to="/auth/signup" className="signup-link">here</Link> to register</p>
        </div>
    </div>
  )
}

export default Login