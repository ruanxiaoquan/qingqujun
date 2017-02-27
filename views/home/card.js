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

import ERefresh from  "../../components/ERefresh";
 

export default class HomeCard extends Component {
    constructor(props) {
        super(props);
        this.data = {
        }
    }

    render() { 
        return ( 
            <ERefresh
                ref="ERefresh"
                method="GET"
                url="/account/list"
                renderRow={this.renderRow.bind(this)}
                onRefreshEnd={data => {
                    return data;
                }}
                onLoadEnd={data => {
                    return data;
                }}
                data={this.data}
            />
        );
    }


    renderRow(data) {
        return (
            <View style={css.body}>
                <View style={[baseCss.row, css.dongtaiRow]}>
                    <Image source={require("../../images/head.png")} style={css.head} />
                    <View style={[baseCss.col1, { paddingLeft: getPix(30) }]}>
                        <View>
                            <Text style={{ color: "#1a1a1a", fontSize: 14 }}>{data.NickName}</Text>
                        </View>
                        <View style={baseCss.row}>
                            <View style={{ marginTop: getPix(10) }}>
                                <Text style={{ color: "#999", fontSize: 10 }}>{data.CreateTime}</Text>
                            </View>
                            <View style={{ marginTop: getPix(10), marginLeft: getPix(20) }}>
                                <Text style={{ color: "#999", fontSize: 10 }}>来自{data.PhoneType || ""}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} style={css.dongtaiBody} onPress={() => {

                }}>
                    <Text>ddd</Text>
                </TouchableOpacity>
                <View style={[baseCss.row, css.bottomBox]}>
                    <View style={[baseCss.col1]}>
                        <View style={[css.touchbtn, { alignItems: "flex-start" }]} />
                    </View>
                    <View style={[baseCss.col3, baseCss.row, { justifyContent: "flex-end", marginRight: 10 }]}>

                        <TouchableOpacity style={css.touchbtn} onPress={() => {
                            //DeviceEventEmitter.emit("openComments", data.NewsID);
                        }}>
                            <View style={css.count}>
                                <Text style={css.countText}>0</Text>
                            </View>
                            <Image style={css.icon} source={require("../../images/pl.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity disabled={true} style={[css.touchbtn]}>
                            <View style={css.count}>
                                <Text style={css.countText}>{0}</Text>
                            </View>
                            <Image style={css.icon} source={require("../../images/xin.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


const paddingWidth = 10;

const css = StyleSheet.create({
    dongtai: {
        width: width - getPix(paddingWidth * 2),
        height: getPix(368),
        backgroundColor: "#fff",
        borderRadius: getPix(10)
    },
    body: {
        borderRadius: getPix(10),
        width: width - getPix(paddingWidth * 2),
        backgroundColor: "#fff",
        paddingTop: getPix(10),
        paddingBottom: getPix(10),
        marginBottom: getPix(12)
    },
    head: {
        width: getPix(72),
        height: getPix(72)
    },
    laba: {
        width: getPix(64),
        height: getPix(46)
    },
    dongtaiRow: {
        height: getPix(72),
        marginTop: getPix(30),
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
        alignItems: "center"
    },
    dongtaiBody: {
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
        marginTop: getPix(25),
    },
    talkText: {
        fontSize: 13,
        color: "#272727",
        lineHeight: 18
    },
    bottomBox: {
        marginTop: getPix(20),
        paddingBottom: getPix(4),
    },
    icon: {
        width: getPix(32),
        height: getPix(30)
    },
    touchbtn: {
        height: getPix(100),
        width: getPix(75),
        paddingTop: getPix(40),
        alignItems: "center"
    },
    count: {
        position: "absolute",
        top: 0,
        right: 0,
        width: getPix(40),
        height: getPix(50),
        justifyContent: "flex-end",
        paddingLeft: getPix(10)
    }, countText: {
        fontSize: 10,
        color: "#fcbd54"
    },
    updateText: {
        fontSize: 13,
        color: "#37acf4"
    },
    pinglunBox: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: "#e5e5e5",
        paddingTop: getPix(40),
        paddingLeft: getPix(20),
        paddingRight: getPix(20),
    },
    zanRow: {
        alignItems: "center"
    },
    zanName: {
        fontSize: 13,
        color: "#1a1a1a",
        marginLeft: getPix(6)
    },
    pinglunItems: {
        marginTop: getPix(30)
    },
    plRow: {
        marginBottom: getPix(20)
    },
    plText: {
        fontSize: 13,
        color: "#1a1a1a",
        lineHeight: 18
    },
    reportNewTag: {
        height: getPix(36),
        width: getPix(140),
        borderRadius: getPix(18),
        backgroundColor: "#ffeaeb"
    },
    reportOldTag: {
        height: getPix(36),
        width: getPix(140),
        borderRadius: getPix(18),
        backgroundColor: "#e0f3ff",
    },
    reportNewText: {
        fontSize: 13,
        color: "#f9545e"
    },
    reportOldText: {
        fontSize: 13,
        color: "#37acf4"
    }
});