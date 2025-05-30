// types/index.js

// Product object shape
export const Product = {
  id: null,
  proname: null,
  protitle: null,
  proprice: null,
  prodesc: null,
  proCategory: null,
  proinfo: null,
  proimgurl: null,
  quantity: null,
};

// CartItem is just a Product with quantity as a number
export const CartItem = {
  ...Product,
  quantity: 0,
};

// LikeItem is the same as CartItem
export const LikeItem = {
  ...Product,
  quantity: 0,
};

// CartState shape for the state in Redux
export const CartState = {
  cartItems: [],
  likeItems: [],
};
