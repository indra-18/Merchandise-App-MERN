import React from 'react'
import heroImage2 from '../../assets/heroImage2.svg'
const Hero = () => {
  return (
    <section className='flex bg-red-600 py-6'>
      <div className='w-[650px] h-auto ml-10'>
        <img src={heroImage2} className='w-full h-full rounded-2xl' alt='group of friends'/>
      </div>
        <h2 className='text-white font-extrabold text-7xl font-mono flex items-center ml-20 italic'>fly with fashion</h2>
    </section>
  )
}

export default Hero
