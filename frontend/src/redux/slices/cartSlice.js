import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      saveCartToLocalStorage(state.items);
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);

      saveCartToLocalStorage(state.items);
    },
    increaseQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i._id === itemId);

      if (existingItem) {
        existingItem.quantity++;
      }

      saveCartToLocalStorage(state.items);
    },
    decreaseQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i._id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }

      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;


