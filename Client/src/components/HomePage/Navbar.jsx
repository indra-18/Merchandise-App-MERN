import React, { useEffect } from 'react'
import newLogo from '../../assets/newLogo.svg'
import cart from '../../assets/cart.svg';
import menuBar from '../../assets/menuBar.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsersWithId } from '../../redux/features/userSlice'

const Navbar = () => {
  const loggedUser = useSelector(state => state.user)
  console.log(loggedUser)
  const userCart = loggedUser.cart

  return (
    <nav className='w-full m-h-[20px] flex justify-between border-y-black'>
      <div className='w-20 h-20 ml-10'>
        <img src={newLogo} alt='logo' className='w-full h-full'/>
      </div>
      <div className='flex items-center'>
        <ul className='text-white flex flex-row items-center'>
            <li className='mr-10'>
            <Link to={'/cart'}>
              <div className="relative max-w-[40px]">
                <img src={cart} alt="cart-icon" />
                {userCart && 
                    <div className="absolute -top-2 -right-1 bg-fuchsia-700 w-6 h-6 rounded-full flex justify-center items-center text-white">
                    {userCart.length}
                  </div>
                }
              </div>
            </Link>
            </li>
            <li className='mr-10'>
                <div className=' max-w-[40px]'>
                  <img src={menuBar} className='w-full' alt='menuBar-icon' />
                </div>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
