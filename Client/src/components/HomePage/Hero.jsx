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
      <div className='flex justify-center items-center flex-wrap'>
        <h2 className=' font-extrabold text-5xl font-mono flex items-center ml-20 italic'>fly with fashion</h2>
          <Link to='/shop'>
            <button className='mt-6 font-extrabold text-red-600 text-center bg-white rounded-md'>SHOP NOW</button>
          </Link>
      </div>
    </section>
    </div>
  )
}

export default Hero
