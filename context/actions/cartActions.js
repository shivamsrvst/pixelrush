export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const decrementCartItem = (productId) => ({
    type: 'DECREMENT_CART_ITEM',
    payload: productId,
  });
  
  
  export const deleteCartItem = (cartItemId) => ({
    type: "DELETE_CART_ITEM",
    payload: cartItemId,
  });
  
  export const resetCart = () => ({
    type: 'RESET_CART',
  });
