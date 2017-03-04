import React, { Component } from 'react';
import {
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { getPix, height, width, topBarHeight, baseCss, onePix } from '../../common/baseCss';
import { Tabs } from "antd-mobile";
import HomeCard from "./card";
import Image from "../../components/LoadingImage";

export default class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <View style={css.container}>
                <HomeCard />
                <Image
                    source={{ uri: "https://www.showapi.com/api/lookPoint/255" }}
                    style={{ width: 200, height: 250 }}
                ></Image>
            </View>
        );
    }
}


const css = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
});