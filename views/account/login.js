import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';


let {width, height} = Dimensions.get("window");

import Loadding from '../../components/Loadding';
import net from '../../common/net';
import helper from "../../common/helper";
import Storage from '../../common/Storage';
import config from "../../config";
import { Toast } from 'antd-mobile';


export default class LoginView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: "qinna",
            password: "youxinpai,8888",
            loadding: false,
            msg: "",
            tips: ""
        }
    }

    componentWillReceiveProps(nextProps) { 
        if (this.props.text != nextProps.account.text && !nextProps.account.loadding) {
            Toast.info(nextProps.account.text);
        }
    }

    render() {
        let {navigator, route, doLogin, account} = this.props;
        return (
            <ScrollView bounces={false}>
                <Image source={require("../../images/bg.png")} style={styles.mian}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.logoBox}>
                        <Image style={styles.logo} source={require("../../images/logo.png")} />
                    </View>
                    <View style={styles.box}>
                        <View style={styles.inputBox}>
                            <View style={[styles.iRow, { borderBottomWidth: helper.onePix, borderColor: "#103353" }]}>
                                <View style={styles.icon}>
                                    <Image source={require("../../images/u_icon.png")} style={styles.i} />
                                </View>
                                <View style={styles.input}>
                                    <TextInput
                                        style={styles.textInput}
                                        underlineColorAndroid={'transparent'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoFocus={false}
                                        placeholderTextColor="#fff"
                                        placeholder="请输入用户名"
                                        keyboardType={"default"}
                                        value={this.state.userName}
                                        onChangeText={text => {
                                            this.setState({
                                                userName: text
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.iRow}>
                                <View style={styles.icon}>
                                    <Image source={require("../../images/p_icon.png")} style={styles.i} />
                                </View>
                                <View style={styles.input}>
                                    <TextInput
                                        style={styles.textInput}
                                        underlineColorAndroid={'transparent'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoFocus={false}
                                        placeholderTextColor="#fff"
                                        placeholder="请输入密码"
                                        keyboardType={"default"}
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        onChangeText={text => {
                                            this.setState({
                                                password: text
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            doLogin(this.state.userName, this.state.password);
                        }}>
                            <Text style={styles.btnText}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <Loadding isShow={account.loadding} />
                </Image>
            </ScrollView>
        );
    }
    componentDidMount() {

    }

    doLogin() {
        let self = this;
        if (!this.state.userName) {
            this.setState({
                tips: "用户名不能为空",
                toast: true
            });
            return;
        }
        if (!this.state.password) {
            this.setState({
                tips: "密码不能为空",
                toast: true
            });
            return;
        }
        if (this.state.toast) {
            setTimeout(() => {
                self.setState({
                    toast: false
                });
            }, 2000);
        }
        this.setState({
            loadding: true
        });
        net.post("/api/wf_user/login", { username: this.state.userName, password: this.state.password, from: "app" })
            .then(data => {
                if (data.code == 1) {
                    storage.save({
                        key: config.cache.token,
                        rawData: {
                            token: data.data.token,
                            loginInfo: data.data
                        }
                    });
                    global.token = data.data.token;
                    global.loginInfo = data.data;
                    self.setState({
                        loadding: false
                    }, () => {
                        self.props.navigator.resetTo({ id: "index", title: "变形金刚" });
                    });
                } else {
                    self.setState({
                        loadding: false
                    }, () => {
                        Toast.fail(data.message, 2);
                    });
                }
            })
            .catch(err => {
                self.setState({
                    loadding: false,
                });
                Toast.offline('当前网络不稳定!!!', 2);
            });
    }
}


const styles = StyleSheet.create({
    mian: {
        width: width,
        height: height,
        backgroundColor: "#14395c",
        alignItems: "center"
    },
    logoBox: {
        alignItems: "center",
        marginTop: 105,
        marginBottom: 70,
    },
    logo: {
        width: 155,
        height: 34
    },
    box: {
        width: width,
        paddingLeft: 25,
        paddingRight: 25
    },
    inputBox: {
        height: 100,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginBottom: 20
    },
    iRow: {
        flexDirection: "row",
        height: 50,
    },
    icon: {
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        flex: 1
    },
    textInput: {
        height: 50,
        color: "#fff",
        fontSize: 16
    },
    i: {
        height: 17,
        width: 17
    },
    btn: {
        height: 45,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "#fff",
        fontSize: 18
    }
});