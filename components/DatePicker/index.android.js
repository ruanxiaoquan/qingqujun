import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    InteractionManager,
    ScrollView,
    Text,
    Modal,
    DatePickerAndroid,
    Dimensions,
} from 'react-native';
const {width} = Dimensions.get("window");
import helper from "../../common/helper";
import moment from "moment";


export default class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<View></View>);
    }

    close() {
        DatePickerAndroid.dismissedAction();
    }

    open() {
        let self = this;
        DatePickerAndroid.open({
            date: this.props.dateTime || new Date()
        }).then(date => {
            if (date.action == "dateSetAction") {
                self.props.onSelected && self.props.onSelected(`${date.year}-${date.month + 1}-${date.day}`);
            } else {
                self.props.onSelected && self.props.onSelected("");
            }
        }).catch(err => { })
            .done();
    }
}

const styles = StyleSheet.create({

});