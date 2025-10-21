import React, { createContext, useReducer, useContext, useEffect } from 'react';
import API from '../utils/api';

// Initial state
const initialState = {
  items: [],
  loading: true,
  error: null,
};

// Actions types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const SET_CART = 'SET_CART';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, items: action.payload, loading: false, error: null };
    case ADD_ITEM: {
      const { product, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.product._id === product._id);
      let updatedItems;
      if (itemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[itemIndex].quantity += quantity;
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }
      return { ...state, items: updatedItems, error: null };
    }
    case REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.product._id !== action.payload);
      return { ...state, items: updatedItems, error: null };
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems, error: null };
    }
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const CartStateContext = createContext();
const CartDispatchContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch initial user cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
        const res = await API.get('/cart');
        dispatch({ type: SET_CART, payload: res.data.items });
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: 'Failed to load cart' });
      }
    };
    fetchCart();
  }, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  return useContext(CartStateContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
