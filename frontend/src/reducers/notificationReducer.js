const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const setMessage = (content, type, time = time * 1000) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        type
      }
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      });
    }, time);
  };
};

export default reducer;
