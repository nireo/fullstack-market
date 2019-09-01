import userService from '../services/user';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_OWNED_ITEMS':
      return action.data;
    case 'ADD_OWNED_ITEM':
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    default:
      return state;
  }
};

export const initItems = () => {
  return async dispatch => {
    const items = await userService.getOwnedItems();
    dispatch({
      type: 'INIT_OWNED_ITEMS',
      data: items
    });
  };
};

export default reducer;
