import { configureStore } from "@reduxjs/toolkit";

import productReducer from './features/productSlice'
import userReducer from './features/userSlice'
import paymentReducer from './features/paymentSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        payment: paymentReducer
    }
})

export default store;