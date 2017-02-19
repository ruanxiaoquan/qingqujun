import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    ListView,
    TouchableOpacity,
    Platform,
    RefreshControl,
    PanResponder,
    ScrollView,
    InteractionManager,
    View
} from 'react-native';

import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import net from "../../common/net";
import Spinner from "react-native-spinkit";
var {width, height} = Dimensions.get("window");

export default class ERefresh extends Component {

    static propTypes = {
        text: PropTypes.string,
        onRefreshEnd: PropTypes.func,
        onRefreshError: PropTypes.func,
        onRequest: PropTypes.func,
        onLoadEnd: PropTypes.func,
        onLoadError: PropTypes.func,
        renderRow: PropTypes.func,
        data: PropTypes.any,
        method: PropTypes.string,
        url: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.Type = {
            CircleFlip: "CircleFlip",
            Bounce: "Bounce",
            Wave: "Wave",
            WanderingCubes: "WanderingCubes",
            Pulse: "Pulse",
            ChasingDots: "ChasingDots",
            ThreeBounce: "ThreeBounce",
            Circle: "Circle",
            "9CubeGrid": "9CubeGrid",
            WordPress: "WordPress",
            FadingCircle: "FadingCircle",
            FadingCircleAlt: "FadingCircleAlt",
            Arc: "Arc",
            ArcAlt: "ArcAlt"
        };

        this.state = {
            listData: [],
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            requestData: {},
            empty: false,
            isInit: true,
            isError: false,
            width: 0,
            height: 0
        }
        this.refresh = null;
    }

    componentWillReceiveProps(next) {
        this.setState({
            requestData: next.data
        });
    }


    componentDidMount() {
        let self = this;
        this.setState({
            requestData: this.props.data
        }, () => {
            InteractionManager.runAfterInteractions(() => {
                self.initRefresh();
            });
        });
    }

    /* UI部分开始 */

    renderActivityIndicator() {
        return Platform.OS == 'android' ?
            (
                <View style={styles.loaddingCol}>
                    <Spinner style={this.state.moreBoxCss} isVisible={true} size={12} type={this.Type.Circle} color={"#999999"} />
                </View>
            ) : (
                <View style={styles.loaddingCol}>
                    <Spinner style={this.state.moreBoxCss} isVisible={true} size={12} type={this.Type.FadingCircle} color={"#999999"} />
                </View>
            )
    }

    renderEmptyView() {
        return (
            <View style={[{ width: this.state.width, height: this.state.height - 30 }, styles.empty]}>
                <Text>空白页</Text>
            </View>
        )
    }

    renderHeader(viewState) {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing, } = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case refresh_none:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>下拉刷新</Text>
                    </View>
                )
            case refresh_idle:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>继续下拉</Text>
                    </View>
                )
            case will_refresh:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>松开立即刷新</Text>
                    </View>
                )
            case refreshing:
                return (
                    <View style={{ flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        {this.renderActivityIndicator()}<Text>刷新中...</Text>
                    </View>
                )
        }
    }

    renderFooter(viewState) {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case load_more_none:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>pull up to load more</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>pull up to load more{pullDistancePercent}%</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{ flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        {this.renderActivityIndicator()}<Text>加载中</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View style={{ height: 35, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>数据已全部加载</Text>
                    </View>
                )
        }
    }

    renderRow(data) {
        let {isError, empty} = this.state;
        let ui = null
        if (empty) {
            ui = this.renderEmptyView();
        }
        else if (isError) {
            ui = this.renderEmptyView();
        } else {
            ui = this.props.renderRow(data);
        }
        return ui;
    }

    render() {
        if (this.state.isInit)
            return (
                <View style={styles.make} onLayout={e => this.setState({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
                    <Spinner isVisible={true} size={30} type={this.Type.Wave} color={"#30abff"} />
                    <Text style={[{ marginTop: 10, fontSize: 12, color: "#30abff" }]}>{this.props.text || "加载中请稍后"}</Text>
                </View>
            );
        return (
            <PullToRefreshListView
                ref={ref => this.refresh = ref}
                viewType={PullToRefreshListView.constants.viewType.listView}
                contentContainerStyle={{ width: width }}
                initialListSize={20}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                pageSize={15}
                pullUpDistance={35}
                pullUpStayDistance={35}
                autoLoadMore={true}
                pullDownDistance={35}
                pullDownStayDistance={35}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderFooter={this.renderFooter.bind(this)}
                onRefresh={this.initRefresh.bind(this)}
                onLoadMore={this.onLoadMore.bind(this)}
            />
        );
    }
    /* UI部分结束 */

    onRefresh() {
        this.refresh.beginRefresh();
    }

    initRefresh() {
        if (this.state.isRequest) {
            return;
        }
        this.setState({
            isRequest: true
        });
        this.requestData(true);
    }




    onLoadMore() {
        if (this.state.isRequest || this.state.empty) {
            return;
        }
        this.setState({
            isRequest: true
        });
        this.requestData();
    }

    requestData(isRefresh) {
        var type = this.props.method || "GET";
        let self = this;
        console.log("请求", this.state.requestData);
        this.props.onRequest && this.props.onRequest(isRefresh, this.state.listData);
        var rData = this.state.requestData;
        if (isRefresh) {
            rData.last_id = 0;
            rData.last_createtime = 0;
        } else {
            setLastData(this.state.listData, rData);
        }
        net.load(this.props.url, type, rData || {})
            .then(data => {
                var result = [];
                var dataSource;
                var empty = false;
                var newData = [];
                var msg = null;
                if (!isRefresh) {
                    if (!empty) {
                        result = (self.props.onLoadEnd && self.props.onLoadEnd(data)) || [];
                        newData = self.state.newData.concat(result);
                        dataSource = self.state.dataSource.cloneWithRows(newData);
                    }
                } else {
                    result = (self.props.onRefreshEnd && self.props.onRefreshEnd(data)) || [];
                    if (result.length == 0) {
                        empty = true;
                        result.push({ empty: true });
                    }
                    dataSource = self.state.dataSource.cloneWithRows(result);
                }
                self.setState({
                    listData: isRefresh ? result : newData,
                    dataSource: dataSource,
                    isRequest: false,
                    empty: empty,
                    isInit: false
                }, () => {
                    this.refresh.endRefresh();
                });
            }).catch(err => {
                console.log(err);
                if (isRefresh)
                    self.onRefreshError && self.onRefreshError(err);
                else
                    self.onLoadError && self.onLoadError(err);
                self.setState({
                    isRequest: false,
                    isError: true
                });
            });
    }
}

function setLastData(arr, data) {
    if (arr.length == 0) return;
    var len = arr.length - 1;
    var r = arr[len];
    data.last_id = r.oasid;
    data.last_createtime = r.createtime;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    make: {
        alignItems: "center",
        justifyContent: 'center',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    moreBox: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 15
    },
    tips: {
        width: width,
        height: 40,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#30abff",
    },
    loaddingCol: {
        marginRight: 10
    },
    empty: {
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: 15
    }
});
