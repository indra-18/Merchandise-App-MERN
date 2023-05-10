// https://www.buymeacoffee.com/scottwindon
import React, { useEffect, useState } from 'react'
import { fetchProductWithId } from '../http-services/api'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/features/userSlice'

const Details = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const user = useSelector(state => state.user)
    const { cart, _id } = user.user
    const dispatch = useDispatch()
    console.log(_id)
    console.log(cart)

    function addProduct() {
        dispatch(addToCart({ userId: _id, cartItem: {productId: id, quantity: 1} }));

    }

    useEffect(() => {
        try {       
                const tempFunc = async () => {
                const result = await fetchProductWithId(id)
                setProduct(result)
            }
            tempFunc()
        } catch (error) {
            console.log(error.message)
        }
    }, [id])

  return (
    <div>
    <div className="  w-3/4 h-3/4 max-w-6xl rounded bg-purple-200 shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className=" md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                    {product.image && <img src={product.image} className="w-full relative z-10" alt="" />}
                </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                    {product.title && <h1 className="font-bold uppercase text-2xl mb-5">{product.title}</h1>}
                    {product.description && <p className="text-sm">{product.description}</p>}
                </div>
                <div>
                    <div className="inline-block align-bottom mr-5">
                        <span className="text-2xl leading-none align-baseline">&#x20b9;</span>
                       {product.price && <span className="font-bold text-5xl leading-none align-baseline">{product.price}</span>}
                    </div>
                    <div className="inline-block align-bottom">
                        <button 
                        className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                        onClick={addProduct}
                        >
                        <i className="mdi mdi-cart -ml-2 mr-2"
                        ></i>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Details
