import { createSlice } from "@reduxjs/toolkit";
import { MdBusiness } from "react-icons/md";

const businessSlice = createSlice({
    name :'business',

    initialState:{
        value:0
    },
    reducers:{
        
    }
});
export const {increment, decrement}=businessSlice.actions;

export default businessSlice.reducer;