import React from 'react'
import newLogo from '../../assets/newLogo.svg'

const Navbar = () => {
  return (
    <nav className='w-full m-h-50 flex justify-between border-y-black bg-red-600 '>
      <div className='w-20 h-20 ml-10'>
        <img src={newLogo} alt='logo' className='w-full h-full'/>
      </div>
      <div className='flex items-center'>
        <ul className='text-white flex flex-row items-center'>
            <li className='mr-10'>Cart</li>
            <li className='mr-10'>Menu</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
