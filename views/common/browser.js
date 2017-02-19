import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Text,
    InteractionManager,
    PanResponder,
    WebView,
    Image
} from 'react-native';

import BaseView from '../../common/baseView'; 
import Loadding from "../../components/Loadding";


export default class BrowserView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: this.props.route.url,
            loading: true,
        }
    }

    render() {
        var self = this;
        return (
            <BaseView  {...this.props} >
                <View style={{ flex: 1 }}>
                    <WebView
                        style={{
                            backgroundColor: "transparent",
                        }}
                        startInLoadingState={true}
                        renderLoading={() => { return <Loadding isShow={true} /> }}
                        scrollEnabled={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onError={(err) => {
                            Alert.alert("页面加载失败");
                        }}
                        onLoadEnd={() => {
                        }}
                        source={{ uri: this.state.url }}
                    >
                    </WebView>
                </View>
            </BaseView>
        );
    }
}