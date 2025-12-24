// create store for redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import sellerReducer from "./seller.slice.js";

const store = configureStore({
    reducer: {
        seller: sellerReducer,
    },
});

export default store;