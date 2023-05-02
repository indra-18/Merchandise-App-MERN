import React from 'react'
import clothingShop from '../../assets/clothingShop.svg'
import Navbar from '../HomePage/Navbar'

const IntroShop = () => {
  return (
    <div className=' bg-red-600'>
      <Navbar />
      <section>
        <div className=' min-w-full max-h-80 flex justify-center'>
          <img src={clothingShop} alt='shopImage' className='w-3/4 py-3' />
        </div>
      </section>
    </div>

  )
}

export default IntroShop
