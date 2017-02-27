import * as types from "./types";
import net from "../common/net";
import cache from "../common/Storage";
import config from "../config";

export const doLogin = (phone, password, nav) => {

    return (dispatch) => {
        dispatch({ type: types.SHOW_LOADDING });
        net.post("/account/login", { phone: phone, password: password })
            .then(data => {
                if (data.code != 1) {
                    dispatch({ type: types.LOGINERROR, text: data.message });
                } else {
                    dispatch({ type: types.HIDE_LOADDING });
                    storage.save({
                        key: config.cache.info,
                        rawData: {
                            token: data.data.token,
                            userInfo: data.data
                        }
                    }); 
                    global.token = data.data.token;
                    global.userInfo = data.data;
                    setTimeout(() => nav.push({ id: "index" }), 10);
                }
            }).catch((err) => {
                dispatch({ type: types.LOGINERROR, text: err.message });
            });
    }
}