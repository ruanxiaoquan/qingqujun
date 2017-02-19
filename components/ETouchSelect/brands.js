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
    Modal,
    StatusBar,
    Text,
    Image
} from 'react-native';

import Loadding from "../../components/Loadding";
import BaseView from '../../common/baseView';
import helper from "../../common/helper";
import net from "../../common/net";
import config from "../../config";

var {width, height} = Dimensions.get('window');


export default class ETouchSelectView extends Component {
    constructor(props) {
        super(props)

        //品牌列表
        var getBrandsSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getBrandsRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        var brandsDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getSectionData: getBrandsSectionData,
            getRowData: getBrandsRowData,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });


        //车系
        var getTieSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getTieRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        var tieDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getSectionData: getTieSectionData,
            getRowData: getTieRowData,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });


        this.state = {
            currentTag: "",
            letter: null,
            loadding: true,
            letters: [],
            brandsDataBlob: [],
            brandsSectionIDs: [],
            brandsRowIDs: [],
            brandsDataSource: brandsDataSource,
            tieDataSource: tieDataSource,
            isShow: false,
            leftWidth: 0,
            rightWidth: 0,
            tieData: {},
            brandsData: [],
            currentBrandId: 2000000005,
            currentBrandName: "安驰",
            currentTieName: "雪豹",
            currentTieId: 2000002198
        }
        this.css = {};
    }



    componentWillMount() {
        var self = this;

    }

    componentDidMount() {
        let self = this;
        InteractionManager.runAfterInteractions(() => {
            self.getBrands(self.state.currentBrandId);
        });
    }

    renderBrandsSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.tagTitle} >
                <Text style={styles.tagTitleText}>{sectionData.toUpperCase()}</Text>
            </View>
        );
    }

    renderTieSectionHeader(sectionData, sectionID) {
        return (
            <View style={[styles.tagTitle, { borderRightWidth: 0 }]} >
                <Text style={styles.tagTitleText}>{sectionData}</Text>
            </View>
        );
    }

    getTies(id, name) {
        if (id == 0) return;
        let self = this;
        this.setState({
            loadding: true,
            currentBrandId: id,
            currentBrandName: name
        });
        let data = this.state.tieData[id];
        if (!data || data.length == 0) {
            let url = `${helper.getConifgItem("brands")}/public/car/series`;
            net.get(url, { brand_id: id })
                .then(item => {
                    let obj = self.operTie(item.data, name);
                    let tieData = self.state.tieData;
                    tieData[id] = item.data;
                    self.setState({
                        tieDataSource: this.state.tieDataSource.cloneWithRowsAndSections(obj.dataBlob, obj.sectionIDs, obj.rowIDs),
                        loadding: false,
                        tieData: tieData
                    });
                }).catch((err) => {
                    console.log(err);
                    self.setState({
                        loadding: false
                    });
                });
        } else {
            let obj = self.operTie(data, name);
            self.setState({
                tieDataSource: this.state.tieDataSource.cloneWithRowsAndSections(obj.dataBlob, obj.sectionIDs, obj.rowIDs),
                loadding: false
            });
        }
    }

    operTie(data, name) {
        let dataBlob = [];
        let sectionIDs = [];
        let rowIDs = [];
        dataBlob["*"] = "*";
        dataBlob[name] = name;
        sectionIDs.push("*");
        sectionIDs.push(name);
        if (!rowIDs[0]) rowIDs[0] = [];
        rowIDs[0].push(0);
        dataBlob[`*:0`] = { serialId: 0, serialName: "车系不限" };
        if (!rowIDs[1]) rowIDs[1] = [];
        data.forEach((item, index) => {
            rowIDs[1].push(item.serialId);
            dataBlob[`${name}:${item.serialId}`] = item;
        });
        return { dataBlob, sectionIDs, rowIDs };
    }

    operBrand(data, id) {
        let self = this;
        let dataBlob = [];
        let sectionIDs = [];
        let rowIDs = [];
        data.forEach((item, index) => {
            if (!dataBlob[item.letter]) {
                dataBlob[item.letter] = item.letter;
                sectionIDs.push(item.letter);
            }
            item.content.forEach((v, i) => {
                if (!rowIDs[index]) rowIDs[index] = [];
                rowIDs[index].push(v.modelId);
                if (id == v.modelId) {
                    v.selected = true;
                } else {
                    v.selected = false;
                }
                v.hash = helper.random();
                dataBlob[`${item.letter}:${v.modelId}`] = v;
                if (index == 1 && i == 0) {
                    self.setState({
                        currentBrandId: v.modelId,
                        currentBrandName: v.modelName
                    });
                    self.getTies(v.modelId, v.modelName);
                }
            });
        });
        return { dataBlob, sectionIDs, rowIDs };
    }

    getBrands(id) {
        let self = this;
        this.setState({
            loadding: true
        });
        let baseData = this.state.brandsData;
        if (baseData.length == 0) {
            let url = `${helper.getConifgItem("brands")}/public/car/brands`;
            net.get(url).then(data => {
                data.data.unshift({
                    content: [{ modelId: 0, modelName: "品牌不限", selected: false }],
                    letter: "*"
                });
                let obj = self.operBrand(data.data, id);
                self.setState({
                    brandsDataSource: self.state.brandsDataSource.cloneWithRowsAndSections(obj.dataBlob, obj.sectionIDs, obj.rowIDs),
                    loadding: false,
                    brandsData: data.data
                });
            });
        } else {
            let obj = self.operBrand(baseData, id);
            self.setState({
                brandsDataSource: self.state.brandsDataSource.cloneWithRowsAndSections(obj.dataBlob, obj.sectionIDs, obj.rowIDs),
                loadding: false
            });
        }
    }

    open() {
        this.setState({
            isShow: true
        });
    }

    renderBrandsRow(data) {
        //console.log(data);
        return (
            <TouchableOpacity style={styles.row} onPress={this.getTies.bind(this, data.modelId, data.modelName)}>
                <Text style={[styles.text, data.selected ? { color: "#30abff" } : {}]}>{data.modelName}</Text>
            </TouchableOpacity>
        );
    }

    renderTieRow(data) {
        return (
            <TouchableOpacity style={[styles.row, { borderRightWidth: 0 }]} onPress={this.selectTie.bind(this, data.serialId, data.serialName)}>
                <Text style={[styles.text, this.state.currentTieId == data.serialId ? { color: "#30abff" } : {}]}>{data.serialName}</Text>
            </TouchableOpacity>
        );
    }

    selectTie(id, name) {
        let self = this;
        this.setState({
            currentTieId: id,
            currentTieName: name
        });
    }

    onShow() {
        // StatusBar.setTranslucent(false);
    }

    render() {
        return (
            <Modal
                onRequestClose={() => { }}
                animationType={"slide"}
                transparent={false}
                onShow={this.onShow.bind(this)}
                visible={this.state.isShow}
            >
                <View style={[styles.statusBar, { backgroundColor: "#30abff" }]} />
                <View style={styles.bar}>
                    <View style={styles.barBtn}></View>
                    <View style={styles.barCenter}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>选择品牌车系</Text>
                    </View>
                    <TouchableOpacity style={styles.barBtn} onPress={() => {
                        let self = this;
                        this.setState({
                            isShow: false
                        }, () => {
                            self.props.onSelected && self.props.onSelected({
                                brandId: self.state.currentBrandId,
                                brandName: self.state.currentBrandName,
                                tieId: self.state.currentTieId,
                                tieName: self.state.currentTieName
                            });
                        });
                    }}>
                        <Text style={{ fontSize: 15, color: "#fff" }}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contarnar}>
                    <View style={styles.leftBox} onLayout={e => {
                        this.setState({
                            leftWidth: e.nativeEvent.layout.width
                        });
                    }}>
                        <ListView
                            style={{ width: this.state.leftWidth }}
                            enableEmptySections={true}
                            dataSource={this.state.brandsDataSource}
                            renderRow={this.renderBrandsRow.bind(this)}
                            renderSectionHeader={this.renderBrandsSectionHeader.bind(this)}
                            pageSize={20}
                        />
                    </View>
                    <View style={styles.rightBox} onLayout={e => {
                        this.setState({
                            rightWidth: e.nativeEvent.layout.width
                        });
                    }}>
                        <ListView
                            style={{ width: this.state.rightWidth }}
                            enableEmptySections={true}
                            dataSource={this.state.tieDataSource}
                            renderRow={this.renderTieRow.bind(this)}
                            renderSectionHeader={this.renderTieSectionHeader.bind(this)}
                            pageSize={20}
                        />
                    </View>
                </View>
                <Loadding isShow={this.state.loadding} />
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
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingBottom: 70
    },
    bar: {
        height: HEIGHT,
        backgroundColor: "#30abff",
        flexDirection: "row"
    },
    statusBar: {
        height: BARHEIGHT
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
        color: "#333",
        borderRightWidth: 1,
        borderColor: "#f2f2f2"
    },
    row: {
        height: rowHeight,
        justifyContent: "center",
        paddingLeft: 15,
        backgroundColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: 1,
        borderColor: "#f2f2f2"
    },
    text: {
        fontSize: 16,
        color: "#333"
    },
    leftBox: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    rightBox: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
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




