import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlistService";

// =========================
// Initial State
// =========================

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
};

// =========================
// Fetch Wishlist
// =========================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      return await wishlistService.getWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// =========================
// Add Product
// =========================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      return await wishlistService.addToWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

// =========================
// Remove Product
// =========================

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      await wishlistService.removeFromWishlist(productId);

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product"
      );
    }
  }
);

// =========================
// Slice
// =========================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch

      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      // Remove

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (!state.wishlist) return;

        state.wishlist.items = state.wishlist.items.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;