import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Text,
    Image
} from 'react-native';

import Spinner from 'react-native-spinkit';
var {width, height} = Dimensions.get('window');

export default class Loadding extends Component {
    constructor(props) {
        super(props)
        var color = this.props.bgColor; 
        this.state = {
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: this.props.size || 25,
            fontSize: this.props.fontSize || 12,
            bg: color,
            color: "#23a5e2"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            bg: nextProps.bgColor
        });
    }

    render() {
        return this.renderView();
    }


    renderView() {
        let index = Platform.OS == "ios" ? 10 : 7;
        let type = this.props.type || this.state.types[index];
        let bg = this.state.bg || "rgba(0,0,0,0)";
        if (!this.props.isShow) {
            return null;
        }
        return (
            <View style={[styles.contarnar, { backgroundColor: bg }]}>
                <View style={styles.box}>
                    <Spinner isVisible={this.props.isShow} size={this.state.size} type={type} color={"#ffffff"} />
                    <Text style={{ color: "#fff", fontSize: this.state.fontSize, marginTop: 15 }}>{this.props.text || "努力加载中"}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contarnar: {
        alignItems: "center",
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    box: {
        backgroundColor: "rgba(0,0,0,0.8)",
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
        borderRadius: 5
    }
});




