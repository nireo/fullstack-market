import messageService from '../services/message';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.data;
    case 'REMOVE_MESSAGE':
      return state.filter(message => message._id !== action.id);
    default:
      return state;
  }
};

export const getMessages = () => {
  return async dispatch => {
    const messages = await messageService.getUserMessages();
    dispatch({
      type: 'SET_MESSAGES',
      data: messages
    });
  };
};

export const removeMessage = id => {
  return async dispatch => {
    await messageService.removeMessage(id);
    dispatch({
      type: 'REMOVE_MESSAGE',
      id: id
    });
  };
};

export default reducer;
