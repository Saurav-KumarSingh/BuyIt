import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to get token headers

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
});

// Fetch all product (admin only)
export const fetchProducts = createAsyncThunk("adminProducts/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


// create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
            productData,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Update existing product
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
                productData,
                getAuthHeaders()
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
            getAuthHeaders()
        );
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


// Slice 
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = true;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;

            })
            // Create a product 
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            //   update product 
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex((product) => product._id === products._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            // delete a product 
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.filter((product)=>product._id!==action.payload)
            })

    },
});

export default adminProductSlice.reducer;