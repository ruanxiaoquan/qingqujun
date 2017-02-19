import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';


export default class LoadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: this.props.uri,
            def: <Image source={this.props.defImage} style={[{ position: "absolute", left: 0, top: 0 }, this.props.style]} />
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.uri != nextProps.uri)
            this.setState({
                uri: nextProps.uri
            });
    }

    render() {
        return (
            <View style={styles.contarnar}>
                {this.state.def}
                <Image source={{ uri: this.state.uri }} style={this.props.style} resizeMode="stretch" onLoad={this.imgLoad.bind(this)} />
            </View>
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

