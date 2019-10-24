import postService from "../services/post";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    default:
      return state;
  }
};

export const getItemLengths = () => {
  return async dispatch => {
    const lengths = await postService.getItemLengths();
    dispatch({
      type: "SET_DATA",
      data: lengths
    });
  };
};

export default reducer;
