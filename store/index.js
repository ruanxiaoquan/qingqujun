import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import * as reducers from "../reducers";
const logger = createLogger();
const middlewares = [thunk, logger];
const createSoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    //将reducer组合起来
    const reducer = combineReducers(reducers);
    //创建store
    const store = createSoreWithMiddleware(reducer, {});
    return store;
}