
import * as types from "./types";

let id = 0;

export const addTodo = (text) => {
    return {
        type: types.ADDTODO,
        id: id++,
        text
    }
}

export const setVisibility = (filter) => {
    return {
        type: types.SET_VISIBILITY,
        filter
    }
}

export const toggleTodo = (id) => {
    return {
        type: types.TOGGLETODO,
        id
    };
}

export const showLoadding = () => {
    return {
        type: types.SHOW_LOADDING,
        loadding: true
    };
}

export const hideLoadding = () => {
    return {
        type: types.HIDE_LOADDING,
        loadding: false
    };
}