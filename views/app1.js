import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from "react-native";

import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import Login from "../containers/account/login";

export default class App extends Component {
    render() {
        return (
            <View>
                <AddTodo />
                <TodoList />
            </View>
        )
    }
}