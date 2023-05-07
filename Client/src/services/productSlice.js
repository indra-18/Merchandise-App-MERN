import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: [],
    error: ''
}

export const  fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios
            .get('http://localhost:8080/')
            .then(response => response.result)
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, state => {
            state.loading = false,
            state.products = action.payload,
            state.error = ''
        })
        builder.addCase(fetchProducts.rejected, state => {
            state.loading = false,
            state.products = [],
            state.error = ''
        })
    }
})

export default productSlice.reducer