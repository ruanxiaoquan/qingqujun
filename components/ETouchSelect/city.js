import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    InteractionManager,
    PanResponder,
    ListView,
    ScrollView,
    Text,
    Modal,
    Image
} from 'react-native';

import Loadding from "../../components/Loadding";
import BaseView from '../../common/baseView';
import helper from "../../common/helper";
import cityData from "../../views/common/cityData";

var {width, height} = Dimensions.get('window');


export default class ETouchSelectView extends Component {
    constructor(props) {
        super(props)

        this.pageSize = 20;//this.lengthNum(cityData);

        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getSectionData: getSectionData,
            getRowData: getRowData,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            currentTag: "",
            letter: null,
            loadding: true,
            letters: [],
            dataBlob: [],
            sectionIDs: [],
            rowIDs: [],
            startHeight: 0,
            baseData: {},
            dataSource: this.dataSource,
            isShow: false,
            currentId: 0,
            currentName: "不限"
        }
        this.letterTag = {};
        this.letterHeader = {};





    }


    lengthNum(arr) {
        let num = 0;
        arr.forEach((item) => {
            item.content.forEach((n, i) => {
                num += 1;
            });
        });
        return num;
    }


    componentWillMount() {
        var self = this;
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove(evt, g) {
                //self.handleTag(evt, true);
            },
            onPanResponderGrant(evt, g) {
                //self.handleTag(evt);
            },
            onPanResponderRelease() {
                //self.setState({ tag: null });
            }
        });

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.renderLetter();
            //this.operListData();
        });
    }


    getItemByNum(num) {
        for (let item in this.letterTag) {
            let n = this.letterTag[item];
            if (num >= n.min && num <= n.max) {
                return { tag: item, value: n };
            }
        }
    }

    handleTag(e, isTouch) {
        let pageY = e.nativeEvent.pageY;
        let tag = this.getItemByNum(pageY);
        // console.log(tag);
        if (tag) {
            if (this.state.currentTag == tag.tag && isTouch) return;
            this.setState({
                currentTag: tag.tag,
                tag: (
                    <View style={styles.tagBox}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{tag.tag.toUpperCase()}</Text>
                        </View>
                    </View>
                )
            });
            var y = this.letterHeader[tag.tag];
            this.refs.list.scrollTo({ y: y });
        }
    }
    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.tagTitle} onLayout={e => {
                //console.log(e.nativeEvent.layout);
                this.letterHeader[sectionData] = e.nativeEvent.layout.y;
            }}>
                <Text style={styles.tagTitleText}>{sectionData.toUpperCase()}</Text>
            </View>
        );
    }

    operListData() {
        let dataBlob = [];
        let sectionIDs = [];
        let rowIDs = [];
        this.state.baseData.forEach((item, index) => {
            dataBlob[item.letter] = item.letter;
            sectionIDs.push(item.letter);
            item.content.forEach((v, i) => {
                if (!rowIDs[index]) rowIDs[index] = [];
                rowIDs[index].push(v.cityid);
                dataBlob[`${item.letter}:${v.cityid}`] = v;
            });
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            loadding: false,
        });

    }


    renderLetter() {
        var ui = [];
        let data = cityData;
        let letter = []
        let result = {};
        // data.forEach((item, index) => {
        //     ui.push(
        //         <View key={helper.random()} style={styles.letterItems} onLayout={e => {
        //             if (index == 0) {
        //                 this.letterTag[item.letter] = {
        //                     min: this.state.startHeight,
        //                     max: e.nativeEvent.layout.height * (index + 1) + this.state.startHeight
        //                 }
        //             } else {
        //                 this.letterTag[item.letter] = {
        //                     min: e.nativeEvent.layout.height * (index + 1) + this.state.startHeight - e.nativeEvent.layout.height,
        //                     max: e.nativeEvent.layout.height * (index + 1) + this.state.startHeight
        //                 }
        //             }
        //         } }>
        //             <Text style={styles.letterText}>
        //                 {item.letter.toUpperCase()}
        //             </Text>
        //         </View>
        //     );
        // });
        let left = this;
        data.forEach(item => {
            item.content.forEach(v => {
                if (this.state.currentId == v.cityid) {
                    v.selected = true;
                } else {
                    v.selected = false;
                }
            });
        });
        this.setState({
            letter: ui,
            baseData: data
        }, () => {
            this.operListData();
        });
    }

    renderRow(data) {
        return (
            <TouchableOpacity style={styles.row} onPress={this.selected.bind(this, data.cityid, data.cityname)}>
                <Text style={[styles.text, this.state.currentId == data.cityid ? { color: "#30abff" } : {}]}>{data.cityname}</Text>
            </TouchableOpacity>
        );
    }

    selected(id, name) {
        let self = this;
        this.setState({
            currentId: id,
            currentName: name,
            isShow: false
        }, () => {
            self.props.onSelected && self.props.onSelected(self.state.currentId, self.state.currentName)
        });
    }

    open() {
        let self = this;
        this.setState({
            isShow: true
        }, () => {

        });
    }


    render() {
        let self = this;
        return (
            <Modal
                onRequestClose={() => { }}
                animationType={"slide"}
                transparent={false}
                visible={this.state.isShow}
            >
                <View style={[styles.statusBar, { backgroundColor: "#30abff" }]} />
                <View style={styles.bar}>
                    <View style={styles.barBtn}></View>
                    <View style={styles.barCenter}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>选择城市</Text>
                    </View>
                    <TouchableOpacity style={styles.barBtn} onPress={() => {
                        let self = this;
                        this.setState({
                            isShow: false
                        }, () => {
                            self.props.onSelected && self.props.onSelected(self.state.currentId, self.state.currentName)
                        });
                    }}>
                        <Text style={{ fontSize: 15, color: "#fff" }}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contarnar} onLayout={e => {
                    //console.log(height - e.nativeEvent.layout.height);
                    this.setState({
                        startHeight: height - e.nativeEvent.layout.height
                    });
                }}>
                    <ListView
                        ref={"list"}
                        style={{ width: width }}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSectionHeader={this.renderSectionHeader.bind(this)}
                        pageSize={this.pageSize}
                    />
                    {this.state.tag}
                    <View  {...this._panResponder.panHandlers} style={styles.leftNav}>
                        {this.state.letter}
                    </View>
                    <Loadding isShow={this.state.loadding} />
                </View>
            </Modal>
        );
    }
}

const headerHeight = 23;
const rowHeight = 50;

const BARHEIGHT = Platform.OS == "ios" ? 20 : 0;
const HEIGHT = 50;


const styles = StyleSheet.create({
    contarnar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    leftNav: {
        position: "absolute",
        backgroundColor: "transparent",
        width: 30,
        top: 0,
        bottom: 0,
        right: 0,
        padding: 5
    },
    bar: {
        height: HEIGHT,
        backgroundColor: "#30abff",
        flexDirection: "row"
    },
    statusBar: {
        height: BARHEIGHT
    },
    tagBox: {
        position: "absolute",
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        left: 0
    },
    tag: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#30abff"
    },
    tagText: {
        color: "#fff"
    },
    letterItems: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    letterText: {
        color: "#30abff"
    },
    tagTitle: {
        paddingLeft: 15,
        backgroundColor: "#f2f2f2",
        height: headerHeight,
        justifyContent: "center",
    },
    tagTitleText: {
        fontSize: 16,
        color: "#333"
    },
    row: {
        height: rowHeight,
        justifyContent: "center",
        paddingLeft: 15,
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 16,
        color: "#333"
    },
    barBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 15
    },
    barCenter: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    }
});




