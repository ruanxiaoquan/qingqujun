import React, { Component } from 'react';
import {
    Text,
    Alert,
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { getPix, height, width, topBarHeight, baseCss, onePix } from '../../common/baseCss';
import { Tabs } from "antd-mobile";
import HomeCard from "./card";
const TabPane = Tabs.TabPane;

export default class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "1"
        }
    }

    callback(key) {
        this.setState({
            activeKey: key
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs activeKey={this.state.activeKey} onChange={this.callback.bind(this)} swipeable={true}>
                    <Tabs.TabPane tab="选项一1" key="1">
                        <HomeCard></HomeCard>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="选项卡2" key="2">
                        <View>
                            <Text>选项卡2</Text>
                        </View>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="选项卡3" key="3">
                        <View>
                            <Text>选项卡3</Text>
                        </View>
                    </Tabs.TabPane>
                </Tabs>
            </View>
        );
    }
}


const paddingWidth = 10;

const css = StyleSheet.create({
    dongtai: {
        width: width - getPix(paddingWidth * 2),
        height: getPix(368),
        backgroundColor: "#fff",
        borderRadius: getPix(10)
    },
    body: {
        borderRadius: getPix(10),
        width: width - getPix(paddingWidth * 2),
        backgroundColor: "#fff",
        paddingTop: getPix(10),
        paddingBottom: getPix(10),
        marginBottom: getPix(12)
    },
    head: {
        width: getPix(72),
        height: getPix(72)
    },
    laba: {
        width: getPix(64),
        height: getPix(46)
    },
    dongtaiRow: {
        height: getPix(72),
        marginTop: getPix(30),
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
        alignItems: "center"
    },
    dongtaiBody: {
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
        marginTop: getPix(25),
    },
    talkText: {
        fontSize: 13,
        color: "#272727",
        lineHeight: 18
    },
    bottomBox: {
        marginTop: getPix(20),
        paddingBottom: getPix(4),
    },
    icon: {
        width: getPix(32),
        height: getPix(30)
    },
    touchbtn: {
        height: getPix(100),
        width: getPix(75),
        paddingTop: getPix(40),
        alignItems: "center"
    },
    count: {
        position: "absolute",
        top: 0,
        right: 0,
        width: getPix(40),
        height: getPix(50),
        justifyContent: "flex-end",
        paddingLeft: getPix(10)
    }, countText: {
        fontSize: 10,
        color: "#fcbd54"
    },
    updateText: {
        fontSize: 13,
        color: "#37acf4"
    },
    pinglunBox: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: "#e5e5e5",
        paddingTop: getPix(40),
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
    },
    zanRow: {
        alignItems: "center"
    },
    zanName: {
        fontSize: 13,
        color: "#1a1a1a",
        marginLeft: getPix(6)
    },
    pinglunItems: {
        marginTop: getPix(30)
    },
    plRow: {
        marginBottom: getPix(20)
    },
    plText: {
        fontSize: 13,
        color: "#1a1a1a",
        lineHeight: 18
    },
    reportNewTag: {
        height: getPix(36),
        width: getPix(140),
        borderRadius: getPix(18),
        backgroundColor: "#ffeaeb"
    },
    reportOldTag: {
        height: getPix(36),
        width: getPix(140),
        borderRadius: getPix(18),
        backgroundColor: "#e0f3ff",
    },
    reportNewText: {
        fontSize: 13,
        color: "#f9545e"
    },
    reportOldText: {
        fontSize: 13,
        color: "#37acf4"
    }
});