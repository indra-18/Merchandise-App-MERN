import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductWithId } from "../../http-services/api";
import { updateQuantity } from "../../redux/features/userSlice";

const Cart = () => {
  const [productsList, setProductsList] = useState([])
  const getUser = useSelector((state) => state.user);
  const { user } = getUser;
  var cart = user?.cart
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const updatedProductsList = await Promise.all(
        cart.map(async (item) => {
          const product = await fetchProductWithId(item.product);
          return { ...product, quantity: item.quantity };
        })
      );
      setProductsList(updatedProductsList);
    };
    fetchProducts();
  }, [cart]);

const updateProductQuantity = async (id, quantity) => {
  const updatedCart = cart.map((item) => {
    if (item.product === id) {
      return { ...item, quantity };
    }
    return item;
  });
  dispatch(updateQuantity({ userId: user._id, updatedCart }));

  const updatedProductIndex = updatedCart.findIndex(item => item.product === id);
  const updatedProduct = await fetchProductWithId(id);
  const updatedProductsList = [...productsList];
  updatedProductsList[updatedProductIndex] = { ...updatedProduct, quantity };
  setProductsList(updatedProductsList);
};

  const incrementQuantity = (id) => {
    const product = productsList.find(item => item.id === id);
    const newQuantity = product.quantity + 1;
    updateProductQuantity(id, newQuantity);
  };

  const decrementQuantity = (id) => {
    const product = productsList.find(item => item.id === id);
    const newQuantity = Math.max(1, product.quantity - 1);
    updateProductQuantity(id, newQuantity);
  };

  const subTotal = productsList.reduce((total, product) => (
    total + product.price * product.quantity
  ), 0)
  console.log(subTotal)
  console.log(productsList)
  const shipping = 50

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">


        <ul>
          {productsList.map((product) => (
            <li key={product.id}>
              <div className="rounded-lg md:w-full">
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={product.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">&#x20b9;{product.price}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span 
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => decrementQuantity(product.id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <p
                          className="h-8 w-8 border bg-white text-center text-xs outline-none py-1.5">
                            {product.quantity}
                          </p>
                        <span 
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        onClick={() => incrementQuantity(product.id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-bold">&#x20b9; {product.price * product.quantity}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>


        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">&#x20b9;{subTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">&#x20b9;{shipping}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">&#x20b9;{subTotal + shipping}</p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
