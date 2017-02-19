import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    DeviceEventEmitter,
    Alert,
    Image
} from 'react-native';

import TopBar from "./topBar";
import Storage from '../../common/Storage';


export default class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static topBarHeight = TopBar.topBarHeight;

    render() {
        return (
            <TopBar
                tintColor={"#30abff"}
                statusBar={{ style: 'light-content', hidden: false }}
                left={this.renderLeft()}
                center={this.renderCenter()}
                right={this.renderRight()}
            />
        );
    }

    renderLeft() {
        switch (this.props.route.id) {
            case "index":
                return <View style={styles.left} />;
            default:
                return (
                    <TouchableOpacity style={styles.left} onPress={() => {
                        this.props.navigator.pop()
                    }}> 
                    </TouchableOpacity>
                );
        }
    }

    renderRight() {
        switch (this.props.route.id) {
            case "index":
                return (
                    <TouchableOpacity onPress={this.logOut.bind(this)} style={[styles.right, { justifyContent: "center", alignItems: "flex-end" }]}>
                        <Text style={{ fontSize: 15, color: "#fff" }}>退出</Text>
                    </TouchableOpacity>
                ); 
            default:
                return (
                    <View style={styles.right}></View>
                );
        }
    }

    logOut() {
        var self = this;
        Alert.alert("提示", "您确定要登出操作？", [{
            text: "取消",
            onPress: () => {
                return true;
            }
        }, {
            text: "退出登录",
            onPress: () => {
                Storage.LogOut();
                self.props.navigator.resetTo({ id: "login" });
            }
        }]);
    }
    renderCenter() {
        switch (this.props.route.id) {
            default:
                return (
                    <View style={styles.center}>
                        <Text numberOfLines={1} style={{ color: "#fffeee", fontSize: 18 }}>{this.props.route.title}</Text>
                    </View>
                );
        }
    }
}

const styles = StyleSheet.create({
    left: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 15,
        flex: 1,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    right: {
        justifyContent: "flex-end",
        paddingRight: 15,
        alignItems: "center",
        flex: 1,
    },
    rightBtn: {
        justifyContent: "center",
        marginLeft: 15
    },
    rightBtnImg: {
        width: 22,
        height: 22
    }
});