import * as types from "../actions/types";

let def = {
    loadding: false
}

let doLogin = (state = def, action) => {
    switch (action.type) {
        case types.SHOW_LOADDING:
            return Object.assign({}, state, {
                loadding: true
            });
        case types.DOLOGIN:
            return {
                request: true,
                phone: action.phone,
                password: action.password
            };
        case types.HIDE_LOADDING:
            return Object.assign({}, state, {
                loadding: false
            });
        case types.LOGINERROR:
            return Object.assign({}, state, {
                loadding: false,
                text: action.text
            });
        default:
            return state;
    }
}

export default doLogin;