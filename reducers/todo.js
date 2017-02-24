import * as types from "../actions/types";



const todo = (state, action) => {
    switch (action.type) {
        case types.ADDTODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case types.TOGGLETODO:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
}


const todos = (state = [], action) => {
    switch (action.type) {
        case types.ADDTODO:
            let ts = [
                ...state,
                todo(undefined, action)
            ];
            return ts;
        case types.TOGGLETODO:
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

export default todos;