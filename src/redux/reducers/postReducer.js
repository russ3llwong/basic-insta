import {
    FETCH_POSTS_SUCCESS,
    FETCH_USER_POSTS_SUCCESS,
    POST_UPLOAD_SUCCESS
} from "../actions/types";

const initialState = {
    posts: [],
    newPost: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
        case FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
            case POST_UPLOAD_SUCCESS:
                return {
                    ...state,
                    newPost: action.payload
                };
        default:
            return state;
    }
}