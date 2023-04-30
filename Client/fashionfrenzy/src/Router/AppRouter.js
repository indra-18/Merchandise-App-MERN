import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/HomePage/Home'
import Shop from '../Components/ShopPage/Shop'

const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/shop' element={<Shop />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRouter
