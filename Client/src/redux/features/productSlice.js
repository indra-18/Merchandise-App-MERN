import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    products: [],
    error: ''
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', () => {
    return axios
            .get(`${import.meta.env.VITE_NODE_API}/products`)
            .then(response => response.data.result)
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.products = action.payload,
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false,
            state.products = [],
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer