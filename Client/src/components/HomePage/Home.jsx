import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Intro from './Intro'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <Hero />
      <Intro />
      <Footer />
    </div>
  )
}

export default Home
