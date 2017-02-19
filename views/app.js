import React, { Component } from 'react';
import {
    Navigator,
    Text,
    Platform,
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    View
} from 'react-native';

if (!__DEV__) {
    global.console.log = () => { };
}

import Storage from '../common/Storage';
import CodePush from "react-native-code-push";
Storage.init();

import IndexView from "./index";
import AdView from "./common/ad";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: false,
            syncMessage: "",
            restartAllowed: true
        };
    }


    configureScene(route) {
        switch (route.id) {
            case 'index':
                return Navigator.SceneConfigs.FadeAndroid;
            default:
                var os = Platform.OS;
                if (os == "android") {
                    return ({
                        ...Navigator.SceneConfigs.PushFromRight,
                        gestures: null //禁用手势返回
                    });
                } else {
                    return Navigator.SceneConfigs.PushFromRight;
                }
        }
    }

    onDidFocus(route) {
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({ syncMessage: "资源加载中" });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ syncMessage: "资源加载中" });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({ syncMessage: "Awaiting user action." });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ syncMessage: "资源加载中" });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({ syncMessage: "资源加载完成", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({ syncMessage: "Update cancelled by user.", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ syncMessage: "Update installed.", progress: false });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({ syncMessage: "资源加载遇到错误", progress: false });
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({ progress });
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "index":
                return <IndexView  {...route.params} navigator={navigator} route={route} />
            case "ad":
                return <AdView  {...route.params} navigator={navigator} route={route} />
            default:
                return (
                    <View>
                        <Text>
                            哥你走错路了
                        </Text>
                    </View>
                );
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ component: AdView, name: "ad", id: "ad" }}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                onDidFocus={this.onDidFocus.bind(this)}
            />
        );
    }
}

export default CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESUME
})(App);