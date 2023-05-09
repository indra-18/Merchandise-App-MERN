import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    user: {},
    users: [],
    cart: [],
    error: ''
}

export const newUser = createAsyncThunk('user/newUser', (formData) => {
    return axios
            .post('http://localhost:8080/users', formData)
            .then(res => res.data.result)
})

export const updateUser = createAsyncThunk('user/updateUser', () => {
    return axios
            .put('http://localhost:8080/users')
            .then(res => res.data.result)
})

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
            .get('http://localhost:8080/users')
            .then(res => res.data.result)
})

export const fetchUsersWithId = createAsyncThunk('user/fetchUsersWithId', (userId) => {
    return axios
    .get(`http://localhost:8080/users/:${userId}`)
    .then(res => res.data.result)
})

export const addToCart = createAsyncThunk('user/addToCart', (userId) => {
    return axios
    .post(`http://localhost:8080/cart/${userId}`)
    .then(res => res.data.result)
})

export const removeFromCart = createAsyncThunk('user/removeFromCart', (userId) => {
    return axios
    .delete(`http://localhost:8080/cart/${userId}`)
    .then(res => res.data.result)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(newUser.pending, state => {
            state.loading = true
        })
        builder.addCase(newUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(newUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        })
        builder.addCase(updateUser.pending, state => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload,
            state.error = ''
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        })

        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false,
            state.users = action.payload,
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message
        })
        builder.addCase(fetchUsersWithId.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsersWithId.fulfilled, (state, action) => {
            state.loading = false,
            state.users = action.payload,
            state.error = ''
        })
        builder.addCase(fetchUsersWithId.rejected, (state, action) => {
            state.loading = false,
            state.users = [],
            state.error = action.error.message
        })
        builder.addCase(addToCart.pending, state => {
            state.loading = true
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false,
            state.cart = action.payload,
            state.error = ''
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false,
            state.cart = [],
            state.error = action.error.message
        })
        builder.addCase(removeFromCart.pending, state => {
            state.loading = true
        })
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false,
            state.cart = action.payload,
            state.error = ''
        })
        builder.addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false,
            state.cart = [],
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer;