import * as types from "../actions/types";

let def = {
    phone: "",
    password: ""
}


const doLogin = (state = def, action) => {
    switch (action.type) {
        case types.SHOW_LOADDING:
            return {
                loadding: action.loadding,
                text: "登录中"
            };
        case types.DOLOGIN:
            return {
                request: true,
                phone: action.phone,
                password: action.password
            };
        case types.HIDE_LOADDING:
            return {
                loadding: action.loadding
            };
        default:
            return state;
    }
}

export default doLogin;