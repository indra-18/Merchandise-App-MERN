import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import Shop from "../components/ShopPage/Shop";
import Details from "../components/Details";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter
