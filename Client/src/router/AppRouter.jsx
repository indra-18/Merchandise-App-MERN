import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import Shop from "../components/ShopPage/Shop";
import Details from "../components/Details";
import LoginPage from "../components/LoginPage/LoginPage";
import Cart from '../components/CartPage/Cart'
import SignupPage from "../components/SignupPage/SignupPage";
import Payments from "../components/CartPage/Payments";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter
