import postService from "../services/post";
import mainService from "../services/mainPost";

// this whole thing is needed since we want to show all the possible
// pages in the pagination, but we don't want to load all the posts at once.
// This ensures that there is an accurate representation of how many pages
// there are.

// state[0] represents the amount of community postings while [1] official
const reducer = (state = [0, 0], action) => {
  switch (action.type) {
    case "SET_DATA_COMMUNITY":
      const withCommunity = [action.data, state[1]];
      return withCommunity;
    case "SET_DATA_MAIN":
      const withMain = [state[0], action.data];
      return withMain;
    default:
      return state;
  }
};

export const getItemLengths = () => {
  return async dispatch => {
    const lengths = await postService.getItemLengths();
    dispatch({
      type: "SET_DATA_COMMUNITY",
      data: lengths.amount
    });
  };
};

export const getMainLengths = () => {
  return async dispatch => {
    const lengths = await mainService.getAmount();
    dispatch({
      type: "SET_DATA_MAIN",
      data: lengths.amount
    });
  };
};

export default reducer;
