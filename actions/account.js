import * as types from "./types";
import net from "../common/net";



export const doLogin = (phone, password) => {
    return (dispatch) => {
        dispatch({ type: types.SHOW_LOADDING });
        net.post("/account/login", { phone: phone, password: password })
            .then(data => {
                dispatch({ type: types.HIDE_LOADDING });
                dispatch({ type: types.DOLOGIN, data: data })
            }).catch(() => {
                dispatch({ type: types.HIDE_LOADDING });
            });
    }
}