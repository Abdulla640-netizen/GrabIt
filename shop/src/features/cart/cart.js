import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name :'cart',

    initialState:{
        value:0
    },
    reducers:{
        
    }
});
export const {increment, decrement}=cartSlice.actions;

export default cartSlice.reducer;