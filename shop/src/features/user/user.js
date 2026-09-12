import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name :'user',

    initialState:{
        value:0
    },
    reducers:{
        
    }
});
export const {increment, decrement}=userSlice.actions;

export default userSlice.reducer;