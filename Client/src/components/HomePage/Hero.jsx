import React from 'react'
import heroImage2 from '../../assets/heroImage2.svg'

import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Hero = () => {
  return (
    <div className='bg-red-600'>
      <Navbar />
      <section className='flex  py-6'>
      <div className='w-[650px] h-auto ml-10'>
        <img src={heroImage2} className='w-full h-full rounded-2xl' alt='group of friends'/>
      </div>
      <div className='flex items-center flex-wrap'>
        <h2 className='text-white font-extrabold text-5xl font-mono flex items-center ml-20 italic'>fly with fashion</h2>
        <a href='/shop'>
          <button className=' ml-20 font-bold py-3 my-0 mx-auto hover:text-orange-300'>Shop Now...</button>
        </a>
      </div>
    </section>
    </div>
  )
}

export default Hero
