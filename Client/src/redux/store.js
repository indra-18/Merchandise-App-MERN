import { configureStore } from "@reduxjs/toolkit";

import productReducer from './features/productSlice'
import userReducer from './features/userSlice'
// import loggedUserSlice from "./features/loggedUserSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        // loggedUser: loggedUserSlice
    }
})

export default store;