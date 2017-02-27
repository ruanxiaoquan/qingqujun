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
import { ListView, RefreshControl } from "antd-mobile";


const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

let index = data.length - 1;
let pageIndex = 0;


export default class IndexView extends Component {

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.initData = [];
        for (let i = 0; i < 20; i++) {
            this.initData.push(`r${i}`);
        }

        this.state = {
            selectedTab: 0,
            hidden: false,
            dataSource: dataSource.cloneWithRows(this.initData),
            refreshing: false,
        }

        
    }


    onRefresh = () => {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.initData = [`ref${pageIndex++}`, ...this.initData];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.initData),
                refreshing: false,
            });
        }, 1000);
    };


    onScroll = () => {
        console.log('sss');
    };

    renderContent(pageText) {
        return (
            <Text>{pageText}</Text>
        );
    }

    render() {
        const separator = (sectionID, rowID) => (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8, 
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <View>
                    <Text>1</Text>
                </View>
            );
        };

        return (
            <BaseView {...this.props}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                    scrollRenderAheadDistance={200}
                    scrollEventThrottle={20}
                    onScroll={this.onScroll}
                    style={{
                        height: 400,
                    }}
                    scrollerOptions={{ scrollbars: true }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                        }
                />
                {/*<TabBar
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
                </TabBar>*/}
            </BaseView>
        );
    }
}