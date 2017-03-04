import React, { Component } from 'react';
import {
    Navigator,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    View
} from 'react-native';
import SplashScreen from "rn-splash-screen";
import Cache from "../../common/Storage";
import AndroidBackTools from '../../components/AndroidBackTools';
import { connect } from 'react-redux';

let { width, height } = Dimensions.get("window");

class AdView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: 3,
            adImg: require("../../images/def.png")
        };
    }

    componentWillMount() {
        AndroidBackTools.addBackAndroidListener(this.props.navigator);
        var self = this;
        Cache.token(ret => {
            global.token = ret.token;
        }, err => { });
    }

    componentDidMount() {
        if (__TYPE__ == "android") {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor("transparent");
        } else {
            StatusBar.setBarStyle("light-content");
        }
        var self = this;
        //self.downloadAd(); 
        self.timer = setInterval(function () {
            if (self.state.time > 0) {
                var t = self.state.time -= 1;
                self.setState({
                    time: t
                });
            } else {
                self.timer && clearInterval(self.timer);
                self.cb();
            }
        }, 1000);
    }

    cb() {
        this.props.navigator.resetTo({ id: "index" });
        if (global.token) {
            this.props.navigator.resetTo({ id: "index" });
        } else {
            this.props.navigator.resetTo({ id: "login" });
        }
    }


    render() {
        return (
            <Image source={this.state.adImg} style={styles.ad} onLoad={() => {
                SplashScreen.hide();
            }}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    this.timer && clearInterval(this.timer);
                    this.cb();
                }}>
                    <Text style={{ color: "#fff", fontSize: 12 }}>跳过({this.state.time}s)</Text>
                </TouchableOpacity>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    btn: {
        position: "absolute",
        top: 30,
        right: 15,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        height: 25,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    ad: {
        width: width,
        height: height
    }
});

export default connect()(AdView);