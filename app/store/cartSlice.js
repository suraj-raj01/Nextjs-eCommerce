// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  cartItems: [],
  likeItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      console.log(state);
      const existing = state.cartItems.find(i => i.id === item.id);
      if (!existing) {
        Swal.fire({
          title: "Data added Successfully",
          icon: "success",
        });
        state.cartItems.push({ ...item, quantity: 1 });
      } else {
        Swal.fire({
          title: "Already Added!!",
          icon: "warning",
        });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      Swal.fire({
        title: "Item removed successfully",
        icon: "success",
      });
    },
    clearCart(state) {
      state.cartItems = [];
    },
    incrementQuantity(state, action) {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        Swal.fire({
          title: "Can't be less than 1",
          icon: "warning",
        });
      }
    },
    addToLike(state, action) {
      const item = action.payload;
      console.log(state);
      const exists = state.likeItems.find(i => i.id === item.id);
      if (!exists) {
        state.likeItems.push(item);
        Swal.fire({
          title: "Item Liked",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Item already liked❤️",
          icon: "warning",
        });
      }
    },
    removeFromLike(state, action) {
      state.likeItems = state.likeItems.filter(i => i.id !== action.payload);
      Swal.fire({
        title: "Item disliked",
        icon: "warning",
      });
    },
    clearLikes(state) {
      state.likeItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  addToLike,
  removeFromLike,
  clearLikes,
} = cartSlice.actions;

export default cartSlice.reducer;
