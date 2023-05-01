import React from 'react'
import clothingShop from '../../assets/clothingShop.svg'

const IntroShop = () => {
  return (
    <section>
      <div className='min-w-full max-h-80 flex justify-center'>
        <img src={clothingShop} alt='shopImage' />
      </div>
    </section>
  )
}

export default IntroShop
