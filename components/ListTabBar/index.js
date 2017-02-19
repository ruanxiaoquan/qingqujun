import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity
} from "react-native";

export default class ListTabBar extends Component {

    static propTypes = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    }

    static defaultProps = {
        activeTextColor: 'navy',
        inactiveTextColor: 'black',
        backgroundColor: null,
    }

    constructor(props) {
        super(props);
        this.tab = [];
    }

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';
        let tabs = [];
        let ns = name.split("-");
        let text;
        if (ns.length > 1) {
            text = (
                <Text style={[{ color: textColor, fontWeight, }, textStyle,]} >
                    {ns[0]}
                    <Text style={[{ color: textColor, fontSize: 14 }]} >
                        {" " + ns[1]}
                    </Text>
                </Text>
            );
        } else {
            text = <Text style={[{ color: textColor, fontWeight, }, textStyle,]} >
                {name}
            </Text>
        }
        return (
            <TouchableOpacity key={page} activeOpacity={1} style={[styles.btn, isTabActive ? styles.actBtn : {}]} onPress={() => onPressHandler(page)}>
                <View style={[styles.tab, this.props.tabStyle,]}>
                    {text}
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let self = this;
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        // const tabUnderlineStyle = {
        //     position: 'absolute',
        //     width: containerWidth / numberOfTabs - 50,
        //     height: 4,
        //     backgroundColor: 'navy',
        //     left: 25,
        //     bottom: 0,
        // };

        // const left = this.props.scrollValue.interpolate({
        //     inputRange: [0, 1,], outputRange: [25, containerWidth / numberOfTabs + 25,],
        // });

        return (
            <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor, }, this.props.style,]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return self.renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                {/*<Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle,]} />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {

    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        height: 44
    },
    actBtn: {
        borderColor: "#39adfc",
        borderBottomWidth: 1
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});