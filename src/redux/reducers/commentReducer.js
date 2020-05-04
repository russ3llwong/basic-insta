import {
    FETCH_COMMENTS_SUCCESS,
    ADD_COMMENT
} from "../actions/types";

const initialState = {
    comments: [],
};

export default function(state = initialState, action) {

    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload
            };
        case ADD_COMMENT:
            return {
                ...state,
            };
        default:
            return state;
    }
}