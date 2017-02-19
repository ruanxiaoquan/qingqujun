import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    StatusBar,
    TouchableOpacity,
    DeviceEventEmitter,
    PixelRatio,
    Alert,
    Image
} from 'react-native';


const StatusBarShape = {
    style: PropTypes.oneOf(['light-content', 'default',]),
    hidden: PropTypes.bool,
    tintColor: PropTypes.string,
    hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none',]),
    showAnimation: PropTypes.oneOf(['fade', 'slide', 'none',])
};

function customizeStatusBar(data) {
    if (Platform.OS === 'ios') {
        if (data.style) {
            StatusBar.setBarStyle(data.style);
        } else {
            StatusBar.setBarStyle(TopBar.defaultProps.statusBar.style);
        }
        const animation = data.hidden ?
            (data.hideAnimation || TopBar.defaultProps.statusBar.hideAnimation) :
            (data.showAnimation || TopBar.defaultProps.statusBar.showAnimation);
        StatusBar.showHideTransition = animation;
        StatusBar.hidden = data.hidden;
    } else {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setHidden(false);
    }
}

export default class TopBar extends Component {

    static propTypes = {
        statusBar: PropTypes.shape(StatusBarShape),
        tintColor: PropTypes.string,
        center: PropTypes.element,
        left: PropTypes.element,
        right: PropTypes.element
    }

    static defaultProps = {
        statusBar: {
            style: 'light-content',
            hidden: false,
            hideAnimation: 'slide',
            showAnimation: 'slide',
        }
    };

    static topBarHeight = HEIGHT + BARHEIGHT;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        customizeStatusBar(this.props.statusBar);
    }

    render() {
        let statusBar = this.props.statusBar.hidden ? null : <View style={[styles.statusBar, { backgroundColor: this.props.tintColor }]} />;
        return (
            <View style={styles.bar}>
                {statusBar}
                <View style={[styles.container, { backgroundColor: this.props.tintColor }]}>
                    {this.props.left}
                    {this.props.center}
                    {this.props.right}
                </View>
            </View>
        );
    }
}

const HEIGHT = 44;
const BARHEIGHT = Platform.OS == "ios" ? 20 : 20;
const styles = StyleSheet.create({
    bar: {
        height: HEIGHT + BARHEIGHT,
    },
    container: {
        height: HEIGHT,
        flexDirection: "row",
        borderColor: "#e5e5e5",
        borderBottomWidth: 1 / PixelRatio.get()
    },
    statusBar: {
        height: BARHEIGHT
    },
    leftBox: {
        justifyContent: "center",
        flex: 0,
    },
    centerBox: {
        justifyContent: "center",
        flex: 2,
    },
    rightBox: {
        justifyContent: "center",
        flex: 1,
    }
});

