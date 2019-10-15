import mainService from "../services/mainPost";
import reviewService from "../services/review";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_MAIN_POSTS":
      return action.data;
    case "REMOVE_MAIN_POST":
      return state.filter(p => p._id !== action.id);
    case "CREATE_MAIN_POST":
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    case "UPDATE_MAIN_POST":
      return state.map(p => (p._id === action.id ? action.data : p));
    case "ADD_SINGLE_POST":
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    default:
      return state;
  }
};

export const initMainPosts = () => {
  return async dispatch => {
    const posts = await mainService.getMainPosts();
    dispatch({
      type: "INIT_MAIN_POSTS",
      data: posts
    });
  };
};

export const getSingleMainPost = id => {
  return async dispatch => {
    const post = await mainService.getMainPostWithId(id);
    dispatch({
      type: "ADD_SINGLE_POST",
      data: post
    });
  };
};

export const removeMainPost = id => {
  return async dispatch => {
    await mainService.deleteMainPost(id);
    dispatch({
      type: "REMOVE_MAIN_POST",
      id: id
    });
  };
};

export const createMainPost = newObject => {
  return async dispatch => {
    const post = await mainService.createMainPost(newObject);
    dispatch({
      type: "CREATE_MAIN_POST",
      data: post
    });
  };
};

export const updateMainPost = (id, newObject) => {
  return async dispatch => {
    const post = await mainService.updateMainPost(id, newObject);
    dispatch({
      type: "UPDATE_MAIN_POST",
      data: post
    });
  };
};

export const addReview = (id, newObject) => {
  return async dispatch => {
    const post = await reviewService.postMainReview(id, newObject);
    dispatch({
      type: "UPDATE_MAIN_POST",
      data: post,
      id: id
    });
  };
};

export const removeReview = id => {
  return async dispatch => {
    await reviewService.removeReview(id);
    dispatch({
      type: "REMOVE_REVIEW",
      id: id
    });
  };
};

export default reducer;
