
import * as types from "../actions/types";

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case types.SET_VISIBILITY:
            return action.visiblityFilter;
        default:
            return state;
    }
}

export default visibilityFilter;