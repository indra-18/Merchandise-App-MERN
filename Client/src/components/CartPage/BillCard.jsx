import React from 'react'
import { Link } from 'react-router-dom';
import { checkedOut } from '../../redux/features/paymentSlice';
import { useDispatch } from 'react-redux';

const BillCard = ({ shipping, subTotal}) => {
  const total = subTotal + shipping
  const dispatch = useDispatch();

  return (
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
        <p className="mb-1 text-lg font-bold">&#x20b9;{total}</p>
        <p className="text-sm text-gray-700">including GST</p>
      </div>
    </div>
    <Link to="/payments">
      <button 
      className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      onClick={() => {
        dispatch(checkedOut(total))
      }}
      >
        Check out
      </button>
    </Link>
  </div>
  )
}

export default BillCard
