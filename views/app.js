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

import { connect } from 'react-redux';

if (!__DEV__) {
    global.console.log = () => { };
}
import CodePush from "react-native-code-push";
<<<<<<< HEAD
Storage.init();

=======
>>>>>>> 1dfbba48a7dd0787b6e4e57d85e6cca6d6ac5cbb
import IndexView from "../containers/index";

import AdView from "../containers/common/ad";
import LoginView from "../containers/account/login";

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
            case "login":
                return <LoginView  {...route.params} navigator={navigator} route={route} />
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
                initialRoute={{ component: AdView, name: "ad", id: "ad", ...this.props }}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                onDidFocus={this.onDidFocus.bind(this)}
            />
        );
    }
}

let root = CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESUME
})(App);

export default connect()(root);