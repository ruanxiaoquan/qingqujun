import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import Top from '../components/TopBar';

const HEIGHT = 44;
const BARHEIGHT = Platform.OS == "ios" ? 20 : 25;
var {width, height} = Dimensions.get('window');

export default class BaseView extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static topBarHeight = HEIGHT + BARHEIGHT;

    render() {
        return (
            <View {...this.props} style={[{ flex: 1, backgroundColor: "#f5f5f5" }, this.props.style]} >
                <Top {...this.props} />
                <View style={[{ flex: 1 }, this.props.contentStyle]}>
                    {this.renderChildren()}
                </View>
            </View>
        );
    };

    renderChildren() {
        var childEelments = [];
        React.Children.forEach(this.props.children, item => {
            childEelments.push(item);
        });
        return (childEelments);
    }
} 