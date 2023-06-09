import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newUser } from '../../redux/features/userSlice';
import { Link, Navigate } from 'react-router-dom';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [status, setStatus] = useState(false)
    // const user = useSelector(state => state.user);
    // const [error, setError] = useState('')
    
    // const { name, email, password} = user.user
    // console.log(name, email, password)
    // if (!name || !email || !password) {
    //     setError('Please Fill All Details')
    // }
    
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const status = await dispatch(newUser(formData));
            setStatus(status.payload)
        } catch (err) {
          setError('This Email Is Already Registered, Please Try Login');
        }
      };

  return (
    <div className='flex justify-center items-center'>
    {status && <Navigate to="/login" />}
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">Welcome</div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">Enter your credentials</div>

        <div className="mt-4">
          <form action="#" method='POST' 
          onSubmit={handleSubmit}
          >
          <div className="flex flex-col mb-5">
              <label htmlFor="name" className="mb-1 text-xs tracking-wide text-gray-600">
                Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setFormData(data => ({
                        ...data,
                        name: e.target.value
                    }))
                  }}
                  value={formData.name}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-at text-blue-500"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setFormData(data => ({
                        ...data,
                        email: e.target.value
                    }))
                  }}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Password:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setFormData(data => ({
                        ...data,
                        password: e.target.value
                    }))
                  }}
                  value={formData.password}
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white 
                text-sm sm:text-base bg-green-400 hover:bg-green-600 rounded-2xl py-2 w-full 
                transition duration-150 ease-in" 
              >
                <span className="mr-2 uppercase">Sign Up</span>
                    <span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    </span>
                </button>
                </div>
            </form>
            {/* {error && <p>{error}</p>} */}
            <p className='mt-4'>Already a Member? <Link to="/login" className=' text-blue-600 font-bold'>LogIn</Link></p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SignupPage
