import post from "../services/post";

const reducer = (state = [], action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return action.data;
        case "CLEAR_SEARCH":
            return [];
        default:
            return state;
    }
};

export const searchForItem = search => {
    return async dispatch => {
        const results = await post.searchForItem(search);
        dispatch({
            type: "SET_SEARCH",
            data: results
        });
    };
};

export const clearSearch = () => {
    return { type: "CLEAR_SEARCH" };
};

export default reducer;
