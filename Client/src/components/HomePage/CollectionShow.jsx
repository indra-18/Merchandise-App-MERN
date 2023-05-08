import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/features/productSlice'
import { Link } from 'react-router-dom'

const CollectionShow = () => {
  const products = useSelector(state => state.product)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(products))
  }, [])

  const trimmed = products.products.slice(0,3);

  return (
    <div className="bg-black w-full px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
    <h2 className=" text-center text-2xl font-bold tracking-tight text-white">NEW DROPS</h2>
    <ul className=' mx-4 grid grid-cols-3 gap-10'>
    {
      trimmed.map(product => (
        <li key={product.id}>
          <Link to={`/details/${product.id}`}>
          <div className="mt-6">
            <div className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-200">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-white">&#x20b9;{product.price}</p>
                </div>
              </div>
            </div>
          <div className='text-center text-indigo-400 font-extrabold text-2xl'>
          </div>
          </Link>
        </li>
      ))
    }
    </ul>
    <div className='mt-6 text-center font-extrabold text-red-600'>
      <a href='/shop'>
        <button className=' bg-white rounded-md'>SHOP MORE</button>
      </a>
    </div>
  </div>
  )
}

export default CollectionShow
