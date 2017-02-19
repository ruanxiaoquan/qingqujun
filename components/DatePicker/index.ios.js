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
import moment from "moment";


export default class DatePicker extends Component {

    constructor(props) {
        super(props);

        let day = this.props.dateTime || new Date();

        this.state = {
            isShow: false,
            dateTime: day,
            formatDate: moment(day).format("YYYY-MM-DD")
        };
    }



    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                >
                <View style={styles.container}>
                    <View style={styles.main}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>请选择日期</Text>
                        </View>
                        <View style={styles.body}>
                            <DatePickerIOS
                                mode={"date"}
                                onDateChange={this.onChange.bind(this)}
                                date={this.state.dateTime}
                                timeZoneOffsetInMinutes={8 * 60}
                                />
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity style={styles.btnCancel} onPress={this.onClose.bind(this)}>
                                <Text style={styles.titleText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOk} onPress={this.onSelected.bind(this)}>
                                <Text style={styles.okText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }


    onChange(date) {
        this.setState({
            dateTime: date,
            formatDate: moment(date).format("YYYY-MM-DD")
        });
    }

    onClose() {
        this.setState({
            isShow: false
        });
    }

    onSelected() {
        let self = this;
        this.setState({
            isShow: false
        }, () => {
            self.props.onSelected && self.props.onSelected(this.state.formatDate);
        });
    }

    open() {
        this.setState({
            isShow: true
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        backgroundColor: "#fff",
        width: width - 120,
        borderWidth: helper.onePix,
        borderColor: "#e5e5e5"
    },
    body: {
        height: 180,
        backgroundColor: "#fff",

    },
    title: {
        backgroundColor: "#fff",
        borderBottomWidth: helper.onePix,
        borderColor: "#e5e5e5",
        height: 40,
        justifyContent: "center",
        paddingLeft: 10
    },
    titleText: {
        color: "#333",
        fontSize: 16
    },
    bottom: {
        height: 40,
        backgroundColor: "#fff",
        borderTopWidth: helper.onePix,
        borderColor: "#e5e5e5",
        flexDirection: "row"
    },
    btnCancel: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: helper.onePix,
        borderColor: "#e5e5e5",
    },
    btnOk: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    okText: {
        color: "#30abff",
        fontSize: 16
    }
});