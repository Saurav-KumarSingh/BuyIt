import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Async thunk to fetch user orders details by ID
export const fetchOrdersDetails = createAsyncThunk(
    "orders/fetchOrdersDetails",
    async (orderId, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
  

// Slice 

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
              })              
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            // fetch order details 
            .addCase(fetchOrdersDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrdersDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
    }
});


export default orderSlice.reducer;

