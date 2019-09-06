const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_ITEM':
      return [...state, action.data];
    case 'REMOVE_ITEM':
      return state.filter(i => i._id !== action.id);
    case 'INIT_ITEMS':
      return action.data;
    case 'CLEAR_CART':
      return null;
    default:
      return state;
  }
};

export const clearCart = () => {
  return { type: 'CLEAR_CART' };
};

export const addItemToCart = item => {
  return { type: 'ADD_NEW_ITEM', data: item };
};

export const removeItemFromCart = itemId => {
  return { type: 'REMOVE_ITEM', id: itemId };
};

export default reducer;
