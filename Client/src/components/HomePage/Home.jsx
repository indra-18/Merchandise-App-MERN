import React from 'react'
import Hero from './Hero'
import Intro from './Intro'
import Footer from './Footer'
import CollectionShow from './CollectionShow'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Hero/>
      <Intro />
      <CollectionShow />
      <Footer />
    </div>
  )
}

export default Home
