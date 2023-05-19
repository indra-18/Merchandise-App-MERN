import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        checkedOut: (state, action) => {
            state.total = action.payload
        }
    }
})

export default paymentSlice.reducer;
export const { checkedOut } = paymentSlice.actions;