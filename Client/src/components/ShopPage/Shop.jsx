import React from 'react'
import Navbar from '../HomePage/Navbar'
import Footer from '../HomePage/Footer'
import AllProducts from './AllProducts'
import IntroShop from './IntroShop'

const Shop = () => {
  return (
    <div className=''>
        <Navbar />
        <IntroShop />
        <AllProducts />
    </div>
  )
}

export default Shop
