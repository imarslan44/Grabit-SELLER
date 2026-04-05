import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../config/env.js";

const initialState = {
    seller: null,
    token: localStorage.getItem("sellerToken") || null,
    loading: false,
    error: null,
    insights: {
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        monthlySales: {
            labels: [],
            values: [],
        },
    },
    insightsStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    insightsError: null,
};

export const fetchSellerInsights = createAsyncThunk(
    'seller/fetchInsights',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/insights/seller`, {
                credentials: 'include', // Important for sending cookies
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch insights');
            }
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerInsights.pending, (state) => {
                state.insightsStatus = 'loading';
            })
            .addCase(fetchSellerInsights.fulfilled, (state, action) => {
                state.insightsStatus = 'succeeded';
                state.insights = action.payload;
            })
            .addCase(fetchSellerInsights.rejected, (state, action) => {
                state.insightsStatus = 'failed';
                state.insightsError = action.payload;
            });
    }
});

export const { setSeller, SET_TOKEN } = sellerSlice.actions;

const sellerReducer =  sellerSlice.reducer;
export default sellerReducer;