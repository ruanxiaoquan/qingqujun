import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native';


export default class LoadImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0, //0初始状态，1成功，2失败 
            loadding: false
        };
    }

    onLoadEnd() {
        this.setState({
            status: this.state.status === 1 ? 0 : 2,
            loadding: false
        });
        console.log("调用onLoadEnd");
    }

    onLoadStart() {
        this.setState({
            status: 0,
            loadding: true
        });
    }

    onLoad() {
        this.setState({
            status: 1
        });
        console.log("调用onLoad");
    }

    render() {
        let props = this.props;
        return (
            <Image
                onLoad={this.onLoad.bind(this)}
                onLoadEnd={this.onLoadEnd.bind(this)}
                onLoadStart={this.onLoadStart.bind(this)}
                {...props}
            >
                <View style={styles.contarnar}>
                    <ActivityIndicator animating={this.state.loadding} color="#000" />
                    {
                        this.state.status == 2 ? <Text>图片加载失败</Text> : null
                    }
                </View>
            </Image>
        );
    };

    imgLoad() {
        this.setState({
            def: null
        });
    };


}

const styles = StyleSheet.create({
    contarnar: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    }
});

