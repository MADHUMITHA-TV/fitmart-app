import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// ==============================
// Fetch All Products
// ==============================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// ==============================
// Fetch Single Product
// ==============================

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      return await productService.getById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ==============================
// Search Products
// ==============================

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword, thunkAPI) => {
    try {
      return await productService.search(keyword);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, thunkAPI) => {
    try {
      return await productService.getByCategory(categoryId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category products"
      );
    }
  }
);

export const fetchProductsByPrice = createAsyncThunk(
  "products/fetchProductsByPrice",
  async ({ min, max }, thunkAPI) => {
    try {
      return await productService.getByPrice(min, max);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Price filter failed"
      );
    }
  }
);
// ==============================
// Product Slice
// ==============================

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Products

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Product By Id

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Products

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
  state.loading = true;
})

.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
  state.loading = false;
  state.products = action.payload;
})

.addCase(fetchProductsByCategory.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
    .addCase(fetchProductsByPrice.pending, (state) => {
    state.loading = true;
})

.addCase(fetchProductsByPrice.fulfilled, (state, action) => {
    state.loading = false;
    state.products = action.payload;
})

.addCase(fetchProductsByPrice.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
});
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;