import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import Shop from "../components/ShopPage/Shop";
import Details from "../components/Details";
import LoginPage from "../components/LoginPage/LoginPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter
