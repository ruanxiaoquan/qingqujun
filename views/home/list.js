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
import ListTabBar from "../../components/ListTabBar";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { Tabs } from "antd-mobile";
import HomeCard from "./card";
const TabPane = Tabs.TabPane;

export default class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() =>
                    <ListTabBar
                        style={styles.defBar}
                        tabStyle={{
                            paddingBottom: 0
                        }}
                    />
                }
                style={styles.tab}
                tabBarUnderlineStyle={{
                    backgroundColor: "#30abff",
                    height: 1,
                }}
                tabBarActiveTextColor="#30abff"
                tabBarInactiveTextColor="#000"
                tabBarTextStyle={{ fontSize: 16, fontWeight: "normal" }}
                locked={false}
            >
                <View tabLabel="tab1" style={{ flex: 1 }}>
                    <HomeCard />
                </View>
                <View tabLabel="tab2" style={{ flex: 1 }}>
                    <Text>2</Text>
                </View>
                <View tabLabel="tab3" style={{ flex: 1 }}>
                    <Text>3</Text>
                </View>
            </ScrollableTabView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    tab: {
        flex: 1,
    },
    defBar: {
        height: 45,
        borderTopWidth: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e5e5e5",
        backgroundColor: "#fff"
    },
});