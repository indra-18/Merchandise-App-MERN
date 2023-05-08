import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Intro from './Intro'
import Footer from './Footer'
import CollectionShow from './CollectionShow'
import Details from '../Details'

const Home = () => {
  return (
    <div className='w-full h-full'>
      {/* <Navbar /> */}
      <Hero />
      <Intro />
      <CollectionShow />
      <Footer />
    </div>
  )
}

export default Home
