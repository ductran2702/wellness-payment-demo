import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import { Cart } from "@/types";

const initialState: Cart = {
  total: 0,
  orderItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartState(state, action: PayloadAction<Cart>) {
      Object.assign(state, action.payload);
    },
    addItem(
      state,
      action: PayloadAction<{
        product_id: number;
        price: number;
        product_name: string;
      }>
    ) {
      const newTotal = state.total + action.payload.price;
      const isAlreadyExisted = state.orderItems.find(
        (item) => item.product_id === action.payload.product_id
      );
      const newOrderItems = isAlreadyExisted
        ? state.orderItems.map((i) =>
            i.product_id === action.payload.product_id
              ? {
                  quantity: i.quantity + 1,
                  product_id: i.product_id,
                  product_name: i.product_name,
                }
              : i
          )
        : [
            ...state.orderItems,
            {
              product_id: action.payload.product_id,
              quantity: 1,
              product_name: action.payload.product_name,
            },
          ];

      state.orderItems = newOrderItems;
      state.total = newTotal;
    },
    clearCart(state, action: PayloadAction<void>) {
      Object.assign(state, {
        total: 0,
        orderItems: [],
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartState, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const cartSelector = (state: RootState) => state.cart;
