import userService from "../services/user";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    case "REMOVE_USER":
      return state.filter(u => u._id !== action.id);
    case "UPDATE_USER":
      return state.map(u => (u._id === action.data._id ? action.data : u));
    case "ADD_SINGLE_USER":
      if (state === null) {
        return action.data;
      }
      return [...state, action.data];
    default:
      return state;
  }
};

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.initUsers();
    dispatch({
      type: "INIT_USERS",
      data: users
    });
  };
};

export const getUserWithId = id => {
  return async dispatch => {
    const user = await userService.getUserById(id);
    dispatch({
      type: "ADD_SINGLE_USER",
      data: user
    });
  };
};

export const removeUser = id => {
  return async dispatch => {
    await userService.removeUser(id);
    dispatch({
      type: "REMOVE_USER",
      id: id
    });
  };
};

export const updateBio = bio => {
  return async dispatch => {
    const user = await userService.updateBio(bio);
    dispatch({
      type: "UPDATE_USERS",
      data: user
    });
  };
};

export default reducer;
