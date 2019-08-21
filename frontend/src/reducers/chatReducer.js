const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    default:
      return state;
  }
};

export const createMessage = object => {
  return { type: 'NEW_MESSAGE', data: object };
};

export default reducer;
