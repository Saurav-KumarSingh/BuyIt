import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to get token headers

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
});

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async (__DO_NOT_USE__ActionTypes, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
                getAuthHeaders(),
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// delete an order 
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
                getAuthHeaders()
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice 
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                const totalSales = action.payload.reduce((acc, order) => {
                    return acc + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllOrders.rejected, (state) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Update order status
            .addCase(updateOrderStatus.fulfilled, (state) => { // Added case to handle updateOrderStatus.pending
                state.loading = false;
                const updatedOrder = action.payload;
                const orderIndex = state.products.findIndex((order) => prder._id === updatedOrder._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state, orders.filter(
                    (order) => order._id !== action.payload
                );

            })
    },
});


export default adminOrderSlice.reducer;