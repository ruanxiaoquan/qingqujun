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
                        icon={require("../images/dongtai.png")}
                        selectedIcon={require("../images/dongtai-act.png")}
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
                        {this.renderContent('生活')}
                    </TabBar.Item>
                    <TabBar.Item
                        title="口碑"
                        key="口碑"
                        badge={'new'}
                        selected={this.state.selectedTab === 1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 1,
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('口碑')}
                    </TabBar.Item>
                    <TabBar.Item
                        title="朋友"
                        key="朋友"
                        dot
                        selected={this.state.selectedTab === 2}
                        onPress={() => {
                            this.setState({
                                selectedTab: 2,
                            });
                        }}
                    >
                        {this.renderContent('朋友')}
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 3}
                        onPress={() => {
                            this.setState({
                                selectedTab: 3,
                            });
                        }}
                    >
                        {this.renderContent('我的')}
                    </TabBar.Item>
                </TabBar>
            </BaseView>
        );
    }
}