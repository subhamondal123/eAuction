import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, TextInput, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, FileDownload, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { CommonData, ErrorCode } from "../../services/constant";
import { BigTextButton, CalenderModal, CheckBox, Loader, Modal, NoDataFound, Timer } from '../../shared';
import { App_uri } from '../../services/config';
import Header from '../header';
import { modifyAuctioneerLiveList } from './Function';
import { CustomStyle } from '../style';
import socketServices from '../../services/api/models/socketService';

// this is auctioneer live list page 
class AuctioneerLiveListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveAuctionList: [],
            listLoader: false,
            totalDataCount: 0,
            pageNum: 0,
            limit: 10,
            refreshing: true,
            pageLoader: true,
            userData: {},
            firstDate: "",
            lastDate: "",

            liveDetailsShowHide: false

        }
    }

    // this is initial function which is call first 
    componentDidMount() {
        // socketServices.initializeSocket();
        this._load();
        this.socketConnection();
    }
    // for socket connection 
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get")
        socketServices.emit("joinroom", { "roleid": userData.roleId })
    }

    componentWillUnmount() {
        // socket.removeAllListeners();
    }
    // this is the first function where set state data 
    _load = async () => {
        let userData = await storageDataModification.userCredential({}, "get");

        this.setState({
            userData: userData,
            // pageLoader: true,
        })
        this.getCurrentMonthFirstDateLastDate();

        await this._apiCallRes()
    };

    getCurrentMonthFirstDateLastDate = () => {
        let mainDate = DateConvert.getCurrentMonthFirstAndLastDate();
        this.state.firstDate = mainDate.firstDate;
        this.state.lastDate = mainDate.lastDate;
        this.setState({
            firstDate: this.state.firstDate,
            lastDate: this.state.lastDate
        })
    }
    // for navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // for for api call response 
    _apiCallRes = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "clientid": userData.clientid,
            "userid": userData.id,
            "status": 6,
            "roleid": userData.roleId,
            "templateid": 1,
            "entitytypeid": userData.entitytypeid,
            "entityid": userData.entityfieldmasterid,
            "enddate": this.state.lastDate,
            "startdate": this.state.firstDate
        }
        let responseData = await MiddlewareCheck("getLiveList", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let auctioneerLiveList = await modifyAuctioneerLiveList(responseData);
                this.setState({
                    liveAuctionList: [...this.state.liveAuctionList, ...auctioneerLiveList.auctioneerLiveList],
                    totalDataCount: auctioneerLiveList.totalCount
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    _openDetailsPage = (item, key) => {
        this.props.navigation.navigate("AuctioneerListDetails", { data: item, status: 6, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) });
    }

    _onShowHide = () => {
        this.setState({
            liveDetailsShowHide: !this.state.liveDetailsShowHide
        })
    }
    // for fetch more data 
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.liveAuctionList.length >= this.state.totalDataCount) {
                    this.setState({ listLoader: false })
                    return null;
                } else {
                    this._load();
                }
            }
        );
    };

    onRefresh = async () => {
        this._onStateReset();
        await this._apiCallRes();
    }

    _onStateReset = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            liveAuctionList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
            // listDataLoader: true,
        })
    }
    // for render loader activityindicator 
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={styles.activityLoadSec}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 250 }} />
        );
    };
    // for render contact list data 
    renderContactList = (item, key) => {
        return (
            <View key={key}>
                <View style={styles.dataListSec}>
                    {this.dataList(item, key)}
                </View>
            </View>
        );
    };
    // for render list data 
    dataList = (item, key) => {
        return <View style={styles.contactInfo}>{this.ListData(item, key)}</View>;
    };

    _timeOut = (param1, param2) => {
        let arr = this.state.liveAuctionList;
        arr.splice(param2, 1);

        this.state.liveAuctionList = arr;
        this.setState({
            liveAuctionList: this.state.liveAuctionList
        })

    }
    // for design list data 
    ListData = (item, key) => {
        return (
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.subBox}
                    activeOpacity={0.8}
                    onPress={() => this._openDetailsPage(item, key)}
                >
                    <View style={styles.BoxMarginSec}>
                        <View style={styles.violetSmallBox} >
                            <Text style={styles.numberText}>{key.toString().length > 1 ? (key + 1) : "0" + (key + 1)}</Text>
                        </View>
                        <View style={styles.itemsSec}>
                            <View style={styles.columnSec}>
                                <Text style={styles.auctionText}>{item.primevalue}</Text>
                                {/* <Text style={styles.auctionTypeText}>{item.}</Text> */}
                            </View>
                            {this.state.liveDetailsShowHide ?
                                <View style={styles.itemSec}>
                                    <View style={styles.liveGreenCircel}>
                                        <View style={styles.deepGreenCircel} />
                                    </View>
                                    <View style={{ marginLeft: '10%' }}>
                                        <View style={styles.violetLiveTextSec}>
                                            <Text style={styles.textLive}>Live</Text>
                                        </View>
                                        <Text style={styles.timeGrayText}>2:35 <Text style={styles.hrsText}>Hrs.</Text></Text>
                                    </View>
                                    <Image source={ImageName.DROP_DOWN_UP_ARROW} style={styles.violetDropDownLogo} />
                                </View> :
                                <View style={styles.itemSec}>
                                    <View style={{ marginLeft: '40%' }}>
                                        {/* <View style={styles.violetCircel}>
                                            <Text style={styles.violetCircelNumberText}>36</Text>
                                        </View> */}
                                    </View>
                                    <View style={styles.timerSec}>
                                        <View style={styles.bigGreenCircel}>
                                            <View style={styles.bigDeepgreenCircel} />
                                        </View>
                                        <View style={styles.timer}>

                                            <Timer startTime={parseInt(item.startDate)}
                                                endTime={parseInt(item.auctionEndTime)}
                                                onTimeOut={() => this._timeOut(item, key)}
                                                additionalTimerTextStyle={{ color: "#7E47F3" }}
                                                additionalHrsTextStyle={{ color: "#8C8C8C" }} />
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    };

    modalSection = () => {
        return (
            <>

            </>
        )
    }

    // for design list header section 
    listHeaderSection = () => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this._onBack()}
                >
                    <Image source={ImageName.BACK_LOGO} style={styles.backLogo} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
            </View>
        )
    }

    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} />
                <View style={styles.space}>
                    {this.listHeaderSection()}
                    {/* {this.ListData()} */}
                    {this.state.pageLoader ?
                        <View style={styles.loaderSec}>
                            <Loader />
                        </View> :
                        <React.Fragment>
                            {this.state.liveAuctionList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.liveAuctionList}
                                        renderItem={({ item, index }) => this.renderContactList(item, index)}
                                        // keyExtractor={(item, key) => key}
                                        onEndReached={this.fetchMore}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.renderLoader}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={this.state.refreshing}
                                                onRefresh={() => this.onRefresh()}
                                            />
                                        }
                                    />
                                    <View style={{ height: 300 }}></View>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <View style={CustomStyle.noDataFoundViewForTabList}>
                                        <NoDataFound />
                                    </View>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    }
                    {this.modalSection()}
                </View>
            </SafeAreaView>


        )
    }
}
const mapStateToProps = (state) => {
    const { SRMBAuctionRedux } = state;
    return { SRMBAuctionRedux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuctioneerLiveListPage);
