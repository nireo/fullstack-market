import postService from '../services/post';
import reviewService from '../services/review';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      if (state === null) {
        return action.data;
      }

      return state.concat(action.data);
    case 'CREATE_NEW_POST':
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    case 'ADD_REVIEW':
      let post = state.find(p => p._id === action.id);
      post.reviews.concat(action.data);
      return state.map(p => (p._id === action.id ? post : p));
    case 'REMOVE_POST':
      return state.filter(p => p._id !== action.id);
    case 'UPDATE_POST':
      return state.map(p => (p._id === action.id ? action.data : p));
    case 'ADD_SINGLE_POST':
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    case 'UPDATE_REVIEW':
      let postWithReview = state.find(p => p._id === action.id);
      // if we don't find the post, don't do anything
      if (!postWithReview) {
        return state;
      }

      const updatedReviews = postWithReview.reviews.map(r =>
        r._id === action.data._id ? action.data : r
      );
      post.reviews = updatedReviews;
      return state.map(p => (p._id === post._id ? post : p));
    default:
      return state;
  }
};

export const initPosts = page => {
  return async dispatch => {
    const posts = await postService.getAllPosts(page);
    dispatch({
      type: 'INIT_POSTS',
      data: posts
    });
  };
};

export const getPostWithId = id => {
  return async dispatch => {
    const post = await postService.getPostById(id);
    dispatch({
      type: 'ADD_SINGLE_POST',
      data: post
    });
  };
};

export const createPost = newObject => {
  return async dispatch => {
    const post = await postService.createNewPost(newObject);
    dispatch({
      type: 'CREATE_NEW_POST',
      data: post
    });
  };
};

export const removePost = id => {
  return async dispatch => {
    await postService.deletePost(id);
    dispatch({
      type: 'REMOVE_POST',
      id: id
    });
  };
};

export const updatePost = (id, newObject) => {
  return async dispatch => {
    const post = await postService.updatePost(id, newObject);
    dispatch({
      type: 'UPDATE_POST',
      data: post,
      id: id
    });
  };
};

export const addReview = (id, newObject) => {
  return async dispatch => {
    const review = await reviewService.postCommunityReview(id, newObject);
    dispatch({
      type: 'UPDATE_POST',
      data: review,
      id: id
    });
  };
};

export const updateReviewHelpful = (id, toPost) => {
  // we need the toPost id to update the correct review in the correct post
  return async dispatch => {
    const newReview = await reviewService.addHelpful(id);
    dispatch({
      type: 'UPDATE_REVIEW',
      data: newReview,
      id: toPost
    });
  };
};

export const removeReview = id => {
  return async dispatch => {
    await reviewService.removeReview(id);
    dispatch({
      type: 'REMOVE_REVIEW',
      id: id
    });
  };
};

export default reducer;
