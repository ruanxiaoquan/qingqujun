import React, { Component } from 'react';
import {
    Text,
    Alert,
    StyleSheet, 
    View
} from 'react-native';

import BaseView from "../common/baseView";
import { TabBar } from 'antd-mobile';
import Icon from "react-native-vector-icons/FontAwesome";
import HomeList from "./home/list";


export default class IndexView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            hidden: false,
        }
    }

    renderContent(pageText) {
        return (
            <Text>{pageText}</Text>
        );
    }

    render() {
        return (
            <BaseView {...this.props}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        icon={require("../images/shouye.png")}
                        selectedIcon={require("../images/shouye-act.png")}
                        iconStyle={{ width: 25, height: 25 }}
                        title="首页"
                        key="首页"
                        selected={this.state.selectedTab === 0}
                        onPress={() => {
                            this.setState({
                                selectedTab: 0,
                            });
                        }}
                    >
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <HomeList></HomeList>
                        </View>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={require("../images/dongtai.png")}
                        selectedIcon={require("../images/dongtai-act.png")}
                        title="动态"
                        key="动态"
                        badge={'new'}
                        selected={this.state.selectedTab === 1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 1,
                            });
                        }}
                        data-seed="logId1"
                    >
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <Text>22</Text>
                        </View>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={require("../images/xiaoxi.png")}
                        selectedIcon={require("../images/xiaoxi-act.png")}
                        title="消息"
                        key="消息"
                        dot
                        selected={this.state.selectedTab === 2}
                        onPress={() => {
                            this.setState({
                                selectedTab: 2,
                            });
                        }}
                    >
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <Text>33</Text>
                        </View>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={require("../images/wode.png")}
                        selectedIcon={require("../images/wode-act.png")}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 3}
                        onPress={() => {
                            this.setState({
                                selectedTab: 3,
                            });
                        }}
                    >
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <Text>4</Text>
                        </View>
                    </TabBar.Item>
                </TabBar>
            </BaseView>
        );
    }
}