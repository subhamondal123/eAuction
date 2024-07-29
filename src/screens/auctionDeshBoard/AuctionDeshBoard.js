import React from "react";
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Color, ImageName } from "../../enums";
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../redux/SRMBAuctionAction'
import { DateConvert, storageDataModification, Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import { Loader, NoDataFound, Timer } from "../../shared";
import Header from "../header";
import { CustomStyle } from "../style";
import { modifyCountData, modifydashboardList } from "./Function";
import styles from "./Style";
import { DeviceInfo } from "../../services/config";
import socketServices from "../../services/api/models/socketService";
import { CryptoDecoder } from "../../services/auth";
import { getData } from "../../services/async-storage";
// this is auction dashboard page 
class AuctionDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            showHide: false,
            status: [6],
            userData: {},
            limit: "10",
            pageNum: "0",
            dashboardAuctionList: [],
            dashboardData: {
                liveCount: "",
                upcomingCount: "",
                openCount: "",
                actionCount: "",
                firstDate: "",
                lastDate: "",
                todayDate: "",
                tommorowDate: "",
                todaysEndTime: ""
            },
            refreshing: true,
        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        // socketServices.initializeSocket();
        this.socketConnection();

        this._unsubscribe = this.props.navigation.addListener(
            'focus', async () => {
                await this._onSetInitialStateData();
                await this._onLoad();
            })
    }

    // for socket connection 
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        socketServices.emit("joinroom", { "roleid": userData.roleId });

        // socketServices.on("connect", () => {
        //     const transport = socketServices.io.engine.transport.name; // in most cases, "polling"
        //     console.log("transports::::::",transport);

        //     socketServices.io.engine.on("upgrade", () => {
        //       const upgradedTransport = socketServices.io.engine.transport.name; // in most cases, "websocket"
        //       console.log("updated transports::::::",upgradedTransport);
        //     });
        //   });


        socketServices.on('aution_creation_response', (data) => {
            console.log("aution_creation_response----------", data)
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(data.message);
                // this.getLveAuctionCount();
                // this.geUpcomingAuctionCount();
                // this.getOpenAuctionCount();
                // this.getActionCount();
                // this.dashboardDataRefresh();
                this._onLoad();
            }
        });
        socketServices.on('dasboard_count_notify', (data) => {
            console.log("dasboard_count_notify----------", data)
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // this.getLveAuctionCount();
                // this.geUpcomingAuctionCount();
                // this.getOpenAuctionCount();
                // this.getActionCount();
                // this.dashboardDataRefresh();
                this._onLoad();
            }
        });
        socketServices.on('Aution_bid_auctioneer_notification', (data) => {
            console.log("Aution_bid_auctioneer_notification----------", data)
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // this.getLveAuctionCount();
                // this.geUpcomingAuctionCount();
                // this.getOpenAuctionCount();
                // this.getActionCount();
                // this.dashboardDataRefresh();
                this._onLoad();
            }
        });

        socketServices.on('Aution_creation_response_for_approver', (data) => {
            console.log("Aution_creation_response_for_approver----------", data)
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // this.getLveAuctionCount();
                // this.geUpcomingAuctionCount();
                // this.getOpenAuctionCount();
                // this.getActionCount();
                // this.dashboardDataRefresh();
                this._onLoad();
            }
        });
        socketServices.on('aution_creation_response_for_bidder', (data) => {
            console.log("aution_creation_response_for_bidder----------", data)
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                // this.getLveAuctionCount();
                // this.geUpcomingAuctionCount();
                // this.getOpenAuctionCount();
                // this.getActionCount();
                // this.dashboardDataRefresh();
                this._onLoad();
            }
        });
    }

    dashboardDataRefresh = async () => {
        this.setState({ dashboardAuctionList: [] });
        await this.getDashboardAllBidList();
    }



    onRefresh = async () => {
        this.setState({ refreshing: true })
        this._onLoad();
    }

    // set the initial data
    _onSetInitialStateData = async () => {
        this.setState({
            pageLoader: true,
            showHide: false,
            status: [6],
            userData: {},
            limit: "10",
            pageNum: "0",
            dashboardAuctionList: [],
            dashboardData: {
                liveCount: "",
                upcomingCount: "",
                openCount: "",
                actionCount: "",
                firstDate: "",
                lastDate: "",
                todayDate: "",
                tommorowDate: "",
                todaysEndTime: ""
            }
        })
    }
    // this is the first function where set state data 
    _onLoad = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({
            userData: userData,
            pageLoader: true,
            refreshing: false
        })
        this.getCurrentMonthFirstDateLastDate();
        // this.timer();
        await this.getLveAuctionCount();
        await this.geUpcomingAuctionCount();
        await this.getOpenAuctionCount();
        await this.getActionCount();
        await this.dashboardDataRefresh();
        this.setState({ pageLoader: false })
    }




    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
        // socket.removeAllListeners();
        // clearInterval();
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // this function used for current date and time
    getCurrentMonthFirstDateLastDate = () => {
        let endTime = new Date();
        endTime.setHours(23, 59, 59, 999);
        let endTimeMilliseconds = Date.parse(endTime)
        let tommorowDate = DateConvert.getTommorowDate();
        let todayDate = Date.parse(new Date);

        let mainDate = DateConvert.getCurrentMonthFirstAndLastDate();
        this.state.dashboardData.firstDate = mainDate.firstDate;
        this.state.dashboardData.lastDate = mainDate.lastDate;
        this.state.dashboardData.tommorowDate = tommorowDate;
        this.state.dashboardData.todayDate = todayDate;
        this.state.dashboardData.todaysEndTime = endTimeMilliseconds;
        this.setState({
            dashboardData: this.state.dashboardData
        })
    }
    // this function used for get action count api call
    getActionCount = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "userid": this.state.userData.id,
            "status": [32, 37],
            "roleid": this.state.userData.roleId,
            "enddate": this.state.dashboardData.lastDate,
            "startdate": this.state.dashboardData.firstDate,
        }
        let responseData = await MiddlewareCheck("action_count", reqData, this.props);
        let actionCountData = await modifyCountData(responseData.response);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dashboardData.actionCount = actionCountData;
            } else {
                this.setState({ alertMessage: responseData.message });
            }
        }
    }
    // this function used for get live auction count api call
    getLveAuctionCount = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "userid": this.state.userData.id,
            "entitytypeid": this.state.userData.entitytypeid,
            "entityid": this.state.userData.entityfieldmasterid,
            "status": [6],
            "roleid": this.state.userData.roleId,
            "enddate": this.state.dashboardData.lastDate,
            "startdate": this.state.dashboardData.firstDate,
        }
        let responseData = await MiddlewareCheck("live_auction_count", reqData, this.props);
        let liveCountData = await modifyCountData(responseData.response);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dashboardData.liveCount = liveCountData;
            } else {
                this.setState({ alertMessage: responseData.message });
            }
        }
    }
    // this function used for get Upcoming count api call
    geUpcomingAuctionCount = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "userid": this.state.userData.id,
            "entitytypeid": this.state.userData.entitytypeid,
            "entityid": this.state.userData.entityfieldmasterid,
            "status": [4],
            "roleid": this.state.userData.roleId,
            "enddate": this.state.dashboardData.lastDate,
            "startdate": this.state.dashboardData.firstDate,
        }
        let responseData = await MiddlewareCheck("live_auction_count", reqData, this.props);
        let upcomingCountData = await modifyCountData(responseData.response);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dashboardData.upcomingCount = upcomingCountData;
            } else {
                this.setState({ alertMessage: responseData.message });
            }
        }
    }
    // get open count this Api call used 
    getOpenAuctionCount = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "userid": this.state.userData.id,
            "entitytypeid": this.state.userData.entitytypeid,
            "entityid": this.state.userData.entityfieldmasterid,
            "status": [5],
            "roleid": this.state.userData.roleId,
            "enddate": this.state.dashboardData.lastDate,
            "startdate": this.state.dashboardData.firstDate,
        }
        let responseData = await MiddlewareCheck("live_auction_count", reqData, this.props);
        let upcomingCountData = await modifyCountData(responseData.response);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.dashboardData.openCount = upcomingCountData;
            } else {
                this.setState({ alertMessage: responseData.message });
            }
        }
    }
    // for dashBoard all list list api call here
    getDashboardAllBidList = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "entityid": this.state.userData.entityfieldmasterid,
            "status": [6, 4],
            "roleid": this.state.userData.roleId,
            "userid": this.state.userData.id,
            "entitytypeid": this.state.userData.entitytypeid,
            "limit": 100,
            "offset": 0,
            "today": this.state.dashboardData.firstDate,
            "tomorrow": this.state.dashboardData.todaysEndTime,
        }
        let responseData = await MiddlewareCheck("dashboard_all_bid_list", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let dashboardList = await modifydashboardList(responseData);
                this.setState({
                    dashboardAuctionList: [...this.state.dashboardAuctionList, ...dashboardList.dashboardList],
                    totalDataCount: dashboardList.totalCount
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for get time difference this function used 
    getTimeDifference = (data) => {
        let modArr = [];
        let dataArr = data.dashboardList;
        for (let i = 0; i < dataArr.length; i++) {
            let modObj = {};
            modObj["timeDiff"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).timeDifference;
            modObj["timeDiffInMilliseconds"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).timeDifferenceInMilliseconds;
            modObj["days"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).day;

            modObj["hours"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).hour;

            modObj["minutes"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).minute;
            modObj["second"] = this.getTimeDiff(dataArr[i].actualStartDateTime, dataArr[i].actualEndDateTime).second;
            Object.assign(dataArr[i], modObj);
            modArr.push(dataArr[i]);
        }
    }

    getTimeDiff = (startDate, endDate) => {
        let start = Number(startDate);
        let end = Number(endDate);

        let startMainDate = new Date(start);
        let endMainDate = new Date(end);
        let startGetTime = startMainDate.getTime();
        let endGetTime = endMainDate.getTime();
        let diff = Math.abs(endGetTime - startGetTime) / 1000;

        var d = Math.floor(diff / (3600 * 24));
        var h = Math.floor(diff % (3600 * 24) / 3600);
        var m = Math.floor(diff % 3600 / 60);
        var s = Math.floor(diff % 60);

        var dDisplay = d.toString().length < 2 ? "0" + d : d;
        var hDisplay = h.toString().length < 2 ? "0" + h : h;
        var mDisplay = m.toString().length < 2 ? "0" + m : m;
        var sDisplay = s.toString().length < 2 ? "0" + s : s;

        let mainDay = dDisplay == "00" ? "00" : dDisplay,
            mainHour = hDisplay == "00" ? ":00" : ":" + hDisplay,
            mainMinute = mDisplay == "00" ? ":00" : ":" + mDisplay,
            mainSecond = sDisplay == "00" ? ":00" : ":" + sDisplay;

        let timeDiff = { day: dDisplay, hour: hDisplay, minute: mDisplay, second: sDisplay, timeDifference: mainDay + mainHour + mainMinute + mainSecond, timeDifferenceInMilliseconds: end - start }

        return timeDiff;

    }

    // for show hide this function used 
    _onShowHide = () => {
        this.setState({
            showHide: !this.state.showHide
        })
    }
    // for live auction list tab 
    _onLiveAuctionList = () => {
        if (this.state.userData.entitytypeid == 3) {
            this.props.navigation.navigate("AuctioneerLiveListPage");
        } else {
            this.props.navigation.navigate("BidderLiveListPage");
        }

    }
    // for upcoming auction list tab
    _onUpcomingAuctionList = () => {
        if (this.state.userData.entitytypeid == 3) {
            this.props.navigation.navigate("AuctioneerUpcomingListPage");
        } else {
            this.props.navigation.navigate("BidderUpcomingListPage");
        }
    }
    // for open Auction list tab 
    _onOpenAuctionlist = () => {
        if (this.state.userData.entitytypeid == 3) {
            this.props.navigation.navigate("AuctioneerOpenListPage");
        } else {
            this.props.navigation.navigate("BidderOpenListPage");
        }
    }

    _onOpenMyAction = () => {
        this.props.navigation.navigate("MyActionListPage");
    }

    // for design live Auction tile tabe 
    liveAuctionTile = () => {
        return (
            <TouchableOpacity style={styles.headerBelowBox}
                onPress={() => this._onLiveAuctionList()}
                activeOpacity={0.9}>
                <View style={styles.belowBoxValueSec}>
                    <View style={{ flex: 1 }}>
                        <Image source={ImageName.VIOLET_LOGO} style={styles.imgSec} />
                    </View>
                    <View style={styles.belowBoxTextSec}>
                        <Text style={styles.workText}>Live</Text>
                        <Text style={styles.smallBoxText}>Auction</Text>
                    </View>
                    <Text style={styles.bigNumberText}>{this.state.dashboardData.liveCount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // for design upcoming auction tile tab 
    upcomingAuctionTile = () => {
        return (
            <TouchableOpacity style={styles.skyBox} onPress={() => this._onUpcomingAuctionList()} activeOpacity={0.9}>
                <View style={styles.belowBoxValueSec}>
                    <View style={{ flex: 1 }}>
                        <Image source={ImageName.SKY_CLOCK} style={styles.imgSec} />
                    </View>
                    <View style={styles.belowBoxTextSec}>
                        <Text style={styles.workText}>Upcoming</Text>
                        <Text style={styles.smallBoxText}>Auction</Text>
                    </View>
                    <Text style={styles.bigNumberText}>{this.state.dashboardData.upcomingCount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // for design open auction tile tab
    openAuctionTile = () => {
        return (
            <TouchableOpacity style={styles.yellowBox} onPress={() => this._onOpenAuctionlist()} activeOpacity={0.9}>
                <View style={styles.belowBoxValueSec}>
                    <View style={{ flex: 1 }}>
                        <Image source={ImageName.YELLOW_OPEN_BOX} style={styles.imgSec} />
                    </View>
                    <View style={styles.belowBoxTextSec}>
                        <Text style={styles.workText}>Open</Text>
                        <Text style={styles.smallBoxText}>Auction</Text>
                    </View>
                    <Text style={styles.bigNumberText}>{this.state.dashboardData.openCount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // for design my auction tile 
    myActionTile = () => {
        return (
            <TouchableOpacity style={styles.orangeBox} activeOpacity={0.9} onPress={() => this._onOpenMyAction()}>
                <View style={styles.belowBoxValueSec}>
                    <View style={{ flex: 1 }}>
                        <Image source={ImageName.FLAG_BOX} style={styles.imgSec} />
                    </View>
                    <View style={styles.belowBoxTextSec}>
                        <Text style={styles.workText}>My Action</Text>
                        {/* <Text style={styles.smallBoxText}>Auction</Text> */}
                    </View>
                    <Text style={styles.bigNumberText}>{this.state.dashboardData.actionCount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // for render dashboard data list 
    renderDashboardList = ({ item, key }) => {
        return (
            <View key={key}>
                <View style={styles.dataList}>
                    {this.dataList(item, key)}
                </View>
            </View>
        )
    }
    // for render list data 
    dataList = (item, key) => {
        return <View>{this.ListData(item)}</View>
    }

    _timeOut = (item, index) => {

        let arr = this.state.dashboardAuctionList;
        for (let i = 0; i < arr.length; i++) {
            if (i == index) {
                arr.splice(index, 1)
            }
        }
        this.state.dashboardAuctionList = arr;
        this.setState({ dashboardAuctionList: this.state.dashboardAuctionList })
        // this._onLoad()
    }

    _openDetailsPage = async (item, key) => {
        let userData = await storageDataModification.userCredential({}, "get");
        if (userData.entitytypeid == 3) {
            if (item.status == 6) {
                this.props.navigation.navigate("AuctioneerListDetails", { data: item, status: item.status, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) })
            } else {
                this.props.navigation.navigate("AuctioneerListDetails", { data: item, status: item.status, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) })

            }
        } else {
            if (item.status == 6) {
                this.props.navigation.navigate("BidderListDetails", { data: item, status: item.status, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) })
            } else {
                this.props.navigation.navigate("BidderListDetails", { data: item, status: item.status, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) })

            }
        }

    }
    // for design live list data 
    LiveListData = (item, key) => {
        return (
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.subBox}
                    activeOpacity={0.8}
                    onPress={() => this._openDetailsPage(item, key)}
                >
                    <View style={styles.BoxMarginSec}>
                        <View style={item.status == 6 ? styles.violetSmallBox : styles.skySmallBox} >
                            <Text style={styles.numberText}>{item.index.toString().length < 2 ? ("0" + (item.index + 1)) : item.index + 1}</Text>
                        </View>
                        <View style={styles.liveListSec}>
                            <View style={styles.columnSec}>
                                <Text style={styles.auctionText}>{item.primevalue}</Text>
                            </View>
                            {this.state.showHide ?
                                <View style={styles.liveSec}>
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
                                <View style={styles.timerItemsSec}>
                                    <View style={{ marginLeft: '40%' }}>
                                    </View>
                                    {item.status == 6 ?
                                        <View style={styles.timerItemSec}>
                                            <View style={styles.bigGreenCircel}>
                                                <View style={styles.bigDeepgreenCircel} />
                                            </View>
                                            <View style={styles.timerSec}>
                                                <Timer startTime={parseInt(item.startDate)}
                                                    endTime={parseInt(item.auctionEndTime)}
                                                    onTimeOut={() => this._timeOut(item, key)}
                                                    additionalTimerTextStyle={{ color: "#7E47F3" }}
                                                    additionalHrsTextStyle={{ color: "#8C8C8C" }} />
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.dateSec}>
                                            <Text style={styles.skySecDateText}>{item.startDate}</Text>
                                            <Text style={styles.skySectimeText}>{item.startTime.substring(0, 5)}</Text>
                                        </View>
                                    }
                                </View>
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onCreateAuction = () => {
        this.props.navigation.navigate("CreateAuction")
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={CustomStyle.container}>
                <Header {...this.props} />
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />
                            }
                        >
                            <View style={styles.space}>
                                {this.liveAuctionTile()}
                                {this.upcomingAuctionTile()}
                                {this.openAuctionTile()}
                                {this.state.dashboardData.actionCount == "00" ?
                                    null
                                    :
                                    this.myActionTile()
                                }
                                <Text style={styles.bidText}>Today's Bid</Text>
                                {this.state.dashboardAuctionList.length > 0 ? (
                                    this.state.dashboardAuctionList.map((item, key) => (
                                        <React.Fragment key={key}>
                                            {this.LiveListData(item, key)}
                                        </React.Fragment>
                                    ))
                                )
                                    :
                                    (
                                        <React.Fragment>
                                            <View style={{ flex: 1, height: 500, marginTop: 20 }}>
                                                <NoDataFound />
                                            </View>
                                        </React.Fragment>
                                    )}
                                <View style={{ marginBottom: 40 }} />
                            </View>
                        </ScrollView>
                    </>
                }
                {this.state.userData.entitytypeid == 3 ?
                    <TouchableOpacity style={styles.floatingButton} activeOpacity={0.9} onPress={() => this.onCreateAuction()}>
                        <Image source={ImageName.WHITE_PLUS_ICON} style={{ height: 40, width: 40, resizeMode: "contain" }} />
                    </TouchableOpacity>
                    : null}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { SRMBAuctionRedux } = state
    return { SRMBAuctionRedux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AuctionDashboard);