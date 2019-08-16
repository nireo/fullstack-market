const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NEW_ITEM':
      return [...state, action.data];
    case 'REMOVE_ITEM':
      return state.filter(i => i !== action.id);
    case 'CLEAR_CART':
      return null;
    default:
      return state;
  }
};

export const clearCart = () => {
  dispatch({ type: 'CLEAR_CART' });
};

export const addItemToCart = itemId => {
  dispatch({ type: 'ADD_NEW_ITEM', data: itemId });
};

export const removeItemFromCart = itemId => {
  dispatch({ type: 'REMOVE_ITEM', id: itemId });
};

export default reducer;
