import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import * as reducers from "../reducers";

const middlewares = [thunk];

const createSoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    //将reducer组合起来
    const reducer = combineReducers(reducers);
    //创建store
    const store = createSoreWithMiddleware(reducer);
    return store;
}