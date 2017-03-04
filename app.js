import React, { Component } from "react";

import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from "react-native";

import { Provider } from "react-redux";
import configureStore from './store/index';
import todoApp from "./reducers";
import App from "./views/app"; 

import Storage from './common/Storage';
Storage.init();

let store = configureStore(todoApp);

export default class RootView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <App /> 
            </Provider>
        );
    }
}

