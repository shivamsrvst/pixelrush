const initialState = {
    items: [],
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingItemIndex = state.items.findIndex((item) => item.cartItemId === action.payload.cartItemId);
        if (existingItemIndex !== -1) {
            return {
                ...state,
                items: state.items.map((item, index) => index === existingItemIndex ? action.payload : item)
            };
        } else { 
            return {
                ...state,
                items: [...state.items, action.payload], 
            };
        }
      
  // Your reducer logic
  case 'DECREMENT_CART_ITEM':
    return {
      ...state,
      items: state.items.map(item => {
        if (item.productId === action.payload) {
          const newQuantity = Math.max(0, item.quantity - 1);
          return newQuantity === 0 
            ? null // Remove item entirely from the array when quantity reaches 0
            : { ...item,  quantity: newQuantity }; 
        }
        return item; 
      }).filter(Boolean) // Filter out any 'null' values
    };
  
  
    case "DELETE_CART_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.cartItemId !== action.payload),
      };
    }

    case 'LOAD_CART_FROM_SERVER':
      return {
        ...state,
        items: action.payload, // Replace with the batched data
      };
  
    
      case "RESET_CART":
        return initialState;
      default:
        return state;
    }
  
  };
  
  export default cartReducer;