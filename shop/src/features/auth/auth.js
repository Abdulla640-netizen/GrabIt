import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name :'auth',

    initialState:{
        value:0
    },
    reducers:{
        
    }
});
export const {increment, decrement}=authSlice.actions;

export default authSlice.reducer;