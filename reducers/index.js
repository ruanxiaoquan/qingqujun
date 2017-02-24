import todos from "./todo";
import visibilityFilter from "./visibilityfilter";
import account from "./account";
import { combineReducers } from "redux";

const app = combineReducers({
    todos,
    account
});

export default app;