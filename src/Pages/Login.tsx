import React, { useState, ChangeEvent } from 'react';
import LoginImage from '../img/Login.jpg';
import Logo from '../img/LogoShedule.png';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [payload, setPayload] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    phone: '',
  })



  const ACCESS_TOKEN_KEY = 'access_token'
  const setAccessToken = (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 3 });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // isLoginMode ? handleSignIn() : handleRegister()
    if (isLoginMode) {
      handleSignIn()
    } else {
      handleRegister()
    }
  }

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/signin', { username, password })
      if (response.status === 200) {
        const accessToken = await response.data.token
        setAccessToken(accessToken)
        // const adminData = response.data.body.user
        // setDataInSessionStorage(JSON.stringify(adminData))
        navigate('/dasboard')
      }
    } catch (error: any) {
      Swal.fire('Oops!', error.response.data.message, 'warning')
    }
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/signup', payload)
      Swal.fire('Success!', response.data.message, 'success')
        .then(() => { window.location.reload(); })
    } catch (error: any) {
      Swal.fire('Oops!', error.response.data.message, 'warning')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setPayload({
      ...payload,
      [field]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode);
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(prevState => !prevState);
  };

  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <div className='flex min-h-screen h-full overflow-hidden relative'>
        <div className='w-full flex flex-1 justify-center items-center bg-gradient-to-r from-[#07bd89] to-[#020f15]'>
          <img src={LoginImage} alt="LoginImage" className='w-full h-full object-cover' />
        </div>
        <div className='p-12 max-w-[480px] w-full flex items-center justify-center bg-white'>
          <div className='m-auto max-w-[400px]'>
            <div className='mb-3 flex items-center'>
              <img src={Logo} alt="Logo" className='w-[90x] h-[70px] object-contain' />
            </div>
            <h6 className='font-semibold text-gray-500 text-xl'>
              {isLoginMode ? 'Welcome to Rang Dong' : 'Create an Account'}
            </h6>
            <p className='mt-7 font-semibold text-gray-400'>
              {isLoginMode ? 'Please sign-in to your account' : 'Please fill in the form to register'}
            </p>
            <form onSubmit={handleSubmit} action="" className='w-full mt-5'>
              {/* ... existing input fields for login ... */}
              {isLoginMode ?
                // Additional login-related content or controls if needed
                <>
                  <input
                    type="text"
                    className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none'
                    placeholder='Username'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                  <input
                    type="password"
                    className='w-full border h-[55px] border-gray-300 mt-5 rounded-md p-2 outline-none'
                    placeholder='Password'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </>

                : (
                  // Registration-related input fields
                  <>
                    <input type="text"
                      className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none mt-4'
                      placeholder='Name'
                      onChange={(e) => handleChange(e, 'name')} />
                    <input type="text"
                      className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none'
                      placeholder='Email'
                      onChange={(e) => handleChange(e, 'email')} />
                    <input
                      type="phone"
                      className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none mt-4'
                      placeholder='Phone Number'
                      onChange={(e) => handleChange(e, 'phone')} />
                    <input type="text"
                      className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none mt-4'
                      placeholder='Username'
                      onChange={(e) => handleChange(e, 'username')} />
                    <input
                      type="password"
                      className='w-full border h-[55px] border-gray-300 rounded-md p-2 outline-none mt-4'
                      placeholder='Passsword'
                      onChange={(e) => handleChange(e, 'password')} />
                  </>
                )}
              {isLoginMode && <div className='mb-4 flex items-center flex-wrap justify-between'>
                <label htmlFor="" className='inline-flex items-center cursor-pointer mt-5 gap-2'>
                  <span className='inline-flex items-center justify-center relative bg-transparent outline-0 p-[9px] rounded-md bg-gray-300'>
                    <input type="checkbox" name="" id="" className='absolute w-full h-full border-gray-300' />
                  </span>
                  <span className='text-sm text-gray-500'>Remember Me</span>
                </label>
                <a href="#" className='text-sm no-underline text-[#696cff] mt-3' onClick={toggleForgotPasswordModal}>Forgot Password?</a>
              </div>}
              <button className='w-full inline-flex items-center justify-center text-white bg-[#696cff] font-bold leading-3 rounded-lg py-4 text-[17px]'>
                {isLoginMode ? 'Sign in' : 'Register'}
              </button>
              <div className='flex items-center flex-wrap justify-center gap-3 mt-3'>
                <p className='font-semibold text-sm text-gray-300'>
                  {isLoginMode ? 'New on our platform?' : 'Already have an account?'}
                </p>
                <p className='font-semibold text-gray-300'>
                  <span className='text-sm no-underline text-[#696cff] cursor-pointer' onClick={toggleMode}>
                    {isLoginMode ? 'Create an account' : 'Sign in'}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 max-w-[400px] rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
            <p className="text-gray-600 mb-4">
              Enter your email address, and we'll send you a link to reset your password.
            </p>
            <input type="email" className='w-full border h-[45px] border-gray-300 rounded-md p-2 outline-none mb-4' placeholder='Enter your email' />
            <button className='w-full bg-[#696cff] text-white font-bold rounded-lg py-2'>
              Send Reset Link
            </button>
            <button className="mt-5 text-gray-600 flex items-center justify-end w-full" onClick={toggleForgotPasswordModal}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>


  );
};

export default Login;
