import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../../services/cartService";

const initialState = {
  cart: null,

  loading: false,

  // loading state for individual products
  addingItems: {},

  error: null,
};

// ==========================
// Get Cart
// ==========================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);

// ==========================
// Add To Cart
// ==========================

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ productId, quantity = 1 }, thunkAPI) => {
//     try {
//       return await cartService.addToCart(productId, quantity);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to add product"
//       );
//     }
//   }
// );

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    console.log("Thunk called", productId, quantity);

    try {
      return await cartService.addToCart(productId, quantity);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

// ==========================
// Update Quantity
// ==========================

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      return await cartService.updateQuantity(cartItemId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

// ==========================
// Remove Item
// ==========================

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId, thunkAPI) => {
    try {
      return await cartService.removeItem(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// ==========================
// Clear Cart
// ==========================

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      return await cartService.clearCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// ==========================
// Slice
// ==========================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Cart

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add To Cart

      .addCase(addToCart.pending, (state, action) => {

    const productId = action.meta.arg.productId;

    state.addingItems[productId] = true;
})

      .addCase(addToCart.fulfilled, (state, action) => {

    const productId = action.meta.arg.productId;

    delete state.addingItems[productId];

    state.cart = action.payload;
})

      .addCase(addToCart.rejected, (state, action) => {

    const productId = action.meta.arg.productId;

    delete state.addingItems[productId];

    state.error = action.payload;
})

      // Update Quantity

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // Remove Item

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // Clear Cart

      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;