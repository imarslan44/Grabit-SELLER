import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seller: null,
    token: localStorage.getItem("sellerToken") || null,
    loading: false,
    error: null,

}

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        setSeller(state, action){
            state.seller = action.payload;
        },
        SET_TOKEN(state, action){
            state.token = action.payload;
        }
    },
});

export const { setSeller, SET_TOKEN } = sellerSlice.actions;

const sellerReducer =  sellerSlice.reducer;
export default sellerReducer;