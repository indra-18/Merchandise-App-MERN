import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    user: {},
    users: [],
    cart: [],
    jwt: '',
    error: ''
}

export const newUser = createAsyncThunk('user/newUser', (formData) => {
    return axios
            .post(`${import.meta.env.VITE_NODE_API}/users/signup`, formData)
            .then(res => res.data)
})

export const loginUser = createAsyncThunk('user/loginUser', (formData) => {
    return axios
            .post(`${import.meta.env.VITE_NODE_API}/users/login`, formData)
            .then(res => res.data)
})

export const updateUser = createAsyncThunk('user/updateUser', (userId) => {
    return axios
            .put(`${import.meta.env.VITE_NODE_API}/users/${userId}`)
            .then(res => res.data.result)
})

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
            .get(`${import.meta.env.VITE_NODE_API}/users`)
            .then(res => res.data.result)
})

export const fetchUsersWithId = createAsyncThunk('user/fetchUsersWithId', (userId) => {
    return axios
    .get(`${import.meta.env.VITE_NODE_API}/users/${userId}`)
    .then(res => res.data.result)
})

export const addToCart = createAsyncThunk(
    'user/addToCart',
    async (data) => {
      const { userId, cartItem } = data;
      return axios
                .post(`${import.meta.env.VITE_NODE_API}/cart/${userId}`, cartItem)
                .then(res => res.data.result);
    }
  );

  export const updateQuantity = createAsyncThunk('user/uupdateQuantity', async(data) => {
    const {userId, updatedCart} = data;
    return axios
            .put(`${import.meta.env.VITE_NODE_API}/cart/${userId}`, updatedCart)
            .then(res => res.data.result);
  })
  


export const removeFromCart = createAsyncThunk('user/removeFromCart', (userId) => {
    return axios
    .delete(`${import.meta.env.VITE_NODE_API}/cart/${userId}`)
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
            state.user = action.payload.result
            state.jwt = action.payload.token
            state.error = ''
        })
        builder.addCase(newUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        })

        builder.addCase(loginUser.pending, state => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload.result
            state.jwt = action.payload.token
            state.cart = action.payload.result.cart
            state.error = ''
        })
        builder.addCase(loginUser.rejected, (state, action) => {
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
            state.error = action.error.message
        })

        builder.addCase(addToCart.pending, state => {
            state.loading = true
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false,
            state.cart = [...state.cart, action.payload],
            state.error = ''
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message
        })

        builder.addCase(updateQuantity.pending, state => {
            state.loading = true
        })
        builder.addCase(updateQuantity.fulfilled, (state, action) => {
            state.loading = false,
            state.cart = action.payload
            state.error = ''
        })
        builder.addCase(updateQuantity.rejected, (state, action) => {
            state.loading = false,
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
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer;