import * as types from "./types";
import net from "../common/net";
import { Toast } from "antd-mobile";

export const doLogin = (phone, password) => {
    return (dispatch) => {
        dispatch({ type: types.SHOW_LOADDING });
        net.post("/account/login", { phone: phone, password: password })
            .then(data => {
                if (data.code == -1) {
                    dispatch({ type: types.LOGINERROR, text: data.message });
                } else {
                    dispatch({ type: types.DOLOGIN, data: data });
                }
            }).catch((err) => {
                dispatch({ type: types.LOGINERROR, text: err.message });
            });
    }
}