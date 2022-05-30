import { useReducer } from "react";

import CartContext from "./cart-context";

const INITIAL_CART_STATE = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const newTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;

    const existingCartItemIndex = state.items.findIndex((item) => {
      console.log(action);

      return item.id === action.payload.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    console.log(existingCartItem);

    let udpatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };

      udpatedItems = [...state.items];
      udpatedItems[existingCartItemIndex] = updatedItem;
    } else {
      udpatedItems = state.items.concat(action.payload);
    }

    return {
      items: udpatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if ((action.type = "REMOVE_CART_ITEM")) {
    console.log(state.items);
    console.log(action);

    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.payload;
    });
    console.log(existingCartItemIndex);

    const existingCartItem = state.items[existingCartItemIndex];

    const newTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.payload);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  return INITIAL_CART_STATE;
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD_CART_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
