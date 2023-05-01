import React from 'react'
import introImage1 from '../../assets/introImage1.svg'

const Intro = () => {
  return (
    <section className='flex py-6 items-center'>
      <p className='font-extrabold ml-10 text-purple-950'>
      "At Frenzy, we're all about helping you express yourself through fashion. That's why we offer a variety of unique and eye-catching designs that you won't find anywhere else. Our streetwear is perfect for anyone who wants to make a bold statement and stand out from the crowd."
      </p>
      <div className='w-[650px] h-auto mr-10'>
        <img src={introImage1} className='w-full h-full rounded-2xl' alt='Drop Is Live'></img>
      </div>
    </section>
  )
}

export default Intro
