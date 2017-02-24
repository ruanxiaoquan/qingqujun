import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from "react-native";
let {width, height} = Dimensions.get("window");
export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItems() {
        let {todos, todoClick} = this.props;
        let ui = [];
        console.log(this.props);
        todos.forEach((item, index) => {
            ui.push(
                <TouchableOpacity style={{ width: 100, height: 20 }} key={item.id} onPress={() => todoClick(item.id)}>
                    <Text>{item.text}</Text>
                </TouchableOpacity>
            );
        });
        return ui;
    }

    render() {
        let ui = this.renderItems();
        console.log(this.props);
        return (
            <View>
                {ui}
            </View>
        )
    }
}
