import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Dimensions,
    Alert,
    ScrollView,
    TouchableOpacity
} from "react-native";
let {width, height} = Dimensions.get("window");

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ""
        }
    }
    render() {
        let {addTodo} = this.props;
        return (
            <View style={css.box}>
                <View style={css.iBox}>
                    <TextInput
                        style={css.input}
                        value={this.state.val}
                        onChangeText={text => this.setState({ val: text })} />
                </View>
                <View style={css.bBox}>
                    <TouchableOpacity style={css.button} onPress={() => {
                        if (!this.state.val) {

                            Alert.alert("请输入todo");

                            return;
                        }
                        addTodo(this.state.val);
                        this.setState({ val: "" });
                    }}>
                        <Text>addTodo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const css = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
    },
    box: {
        flexDirection: "row"
    },
    iBox: {
        flex: 3
    },
    bBox: {
        flex: 1
    },
    input: {
        height: 40
    },
    button: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc"
    }
});

