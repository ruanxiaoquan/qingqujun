import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    InteractionManager,
    ScrollView,
    Text,
    Modal,
    DatePickerIOS,
    Dimensions,
} from 'react-native';
const {width} = Dimensions.get("window");
import helper from "../../common/helper";
import Gallery from 'react-native-gallery';


export default class BigImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            images: [],
            index: 0,
            count: 0
        };
    }

    render() {
        return (
            <Modal
                onRequestClose={() => { }}
                animationType={"slide"}
                transparent={false}
                onShow={() => {
                    console.log("打开了");
                }}
                visible={this.state.isShow}
            >
                <View style={styles.topBox} />
                <View style={styles.contarnar}>
                    <Gallery style={styles.contarnar}
                        onSingleTapConfirmed={this.onClose.bind(this)}
                        initialPage={this.state.index}
                        onPageSelected={(e) => {
                            this.setState({
                                index: e
                            })
                        }}
                        images={this.state.images}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>
                        {(this.state.index + 1) + "/" + this.state.count}
                    </Text>
                </View>
            </Modal>
        );
    }


    onClose() {
        this.setState({
            isShow: false
        });
    }

    open(imgs, index) {
        this.setState({
            isShow: true,
            images: imgs,
            count: imgs.length,
            index: index
        });
    }
}

const BARHEIGHT = 20;
const HEIGHT = 50;


const styles = StyleSheet.create({
    contarnar: {
        backgroundColor: "#000",
        flex: 1
    },
    topBox: {
        height: 50,
        backgroundColor: "#000",
    },
    textBox: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 50,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    },
    text: {
        color: "#fff"
    }
});




