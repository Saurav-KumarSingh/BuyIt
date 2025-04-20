import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async  Thunk to fetch all products (filters) 

export const fetchFilteredProducts = createAsyncThunk("products/fetchByFilter",
    async ({ collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit }) => {
        const query = new URLSearchParams();

        if (collection) query.append("collection", collection);
        if (size) query.append("size", size);
        if (color) query.append("color", color);
        if (gender) query.append("gender", gender);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (brand) query.append("brand", brand);
        if (limit) query.append("limit", limit);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/?${query.toString()}`);

        return response.data;

    })

// Async  Thunk to fetch single product by ID
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return response.data;
    }
);

// Async  Thunk to update existing product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }
        );
        return response.data;
    }
);

// Async  Thunk to fetch similar products
export const fetchSimilarProducs = createAsyncThunk(
    "products/fetchSimilarProducs",
    async ({ id }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/`
        );
        return response.data;
    }
);


// Slice 

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        similarProduct: [],
        loading: false,
        error: null,
        filters: {
            collection: "",
            size: "",
            color: "",
            gender: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            category: "",
            material: "",
            brand: "",
            limit: ""
        },
        
    },
    reducers: {
        setFiters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                collection: "",
                size: "",
                color: "",
                gender: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                category: "",
                material: "",
                brand: "",
                limit: ""
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch filtered products
            .addCase(fetchFilteredProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload:[];
            })
            .addCase(fetchFilteredProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch product details
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
            
                // Find index of the product in the state
                const index = state.products.findIndex((product) => product._id === updatedProduct._id);
            
                // Replace product at that index
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            
                // Also update selectedProduct if needed
                state.selectedProduct = updatedProduct;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch similar products
            .addCase(fetchSimilarProducs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducs.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProduct = action.payload;
            })
            .addCase(fetchSimilarProducs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }

});


export const { setFiters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
