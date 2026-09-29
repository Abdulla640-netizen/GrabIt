import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name :'card',

    initialState:{
        value:[]
    },
     reducers:{
        setCardData: (state, action) =>{
            console.log('привет')
            state.value = action.payload
            console.log(state.value)
        }
    }
});
export const {setCardData}=cardSlice.actions;

export default cardSlice.reducer;