import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

// ======================
// Initial State
// ======================

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// ======================
// Place Order
// ======================

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      return await orderService.placeOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

// ======================
// Get My Orders
// ======================

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getMyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ======================
// Get Order By Id
// ======================

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getOrder(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

// ======================
// Update Status
// ======================

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      return await orderService.updateStatus(orderId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
);

// ======================
// Delete Order
// ======================

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      await orderService.deleteOrder(orderId);
      return orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);



// ======================
// Slice
// ======================

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================
      // Place Order
      // ======================

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // Fetch Orders
      // ======================

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // Fetch Order By Id
      // ======================

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================
      // Update Status
      // ======================

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.currentOrder = action.payload;

        state.orders = state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? action.payload
            : order
        );
      })

      // ======================
      // Delete Order
      // ======================

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.orderId !== action.payload
        );

        if (
          state.currentOrder &&
          state.currentOrder.orderId === action.payload
        ) {
          state.currentOrder = null;
        }
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;