import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../App";

const categoriesSlice = createSlice({
    name :'categories',

    initialState:{
        value:[]
    },
    reducers:{
       setCategories:(state)=>{
            state.value = [...state]
        },
        getCategories:()=>{
             return state
        },
    }
});
export const {setCategories,  getCategories}=categoriesSlice.actions;

export default categoriesSlice.reducer;