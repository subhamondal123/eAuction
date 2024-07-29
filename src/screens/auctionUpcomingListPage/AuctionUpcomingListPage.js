import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, TextInput, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, Dimension, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { CustomStyle } from '../../../style';
import { DateConvert, FileDownload, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { CommonData, ErrorCode } from "../../services/constant";
import { Loader, NoDataFound } from '../../shared';
import Header from '../header';
import { modifyAuctioneerUpcomingList } from './Function';
import { CustomStyle } from '../style';
import socketServices from '../../services/api/models/socketService';

// this is auctioneer upcoming page 
class AuctioneerUpcomingListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingAuctionList: [],
            listLoader: true,
            totalDataCount: 0,
            pageNum: 0,
            limit: 10,
            refreshing: true,
            pageLoader: true,
            firstDate: "",
            lastDate: "",

            liveDetailsShowHide: false,

        }
    }

    // this is initial function which is call first 
    componentDidMount() {
        // socketServices.initializeSocket();
        this.socketConnection();
        this._load();
    }

    componentWillUnmount() {
        // socket.removeAllListeners();
    }
    // for socket connection 
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get")
        socketServices.emit("joinroom", { "roleid": userData.roleId })
    }
    // this is the first function where set state data 
    _load = async () => {
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
    // for api call responce 
    _apiCallRes = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "clientid": userData.clientid,
            "userid": userData.id,
            "status": 4,
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
                let auctioneerLiveList = await modifyAuctioneerUpcomingList(responseData);
                this.setState({
                    upcomingAuctionList: [...this.state.upcomingAuctionList, ...auctioneerLiveList.auctioneerLiveList],
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

    _onUpcomingDetails = (item, key) => {
        this.props.navigation.navigate("AuctioneerListDetails", { data: item, status: 4, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) });

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
                if (this.state.upcomingAuctionList.length >= this.state.totalDataCount) {
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
            upcomingAuctionList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
            // listDataLoader: true,
        })
    }
    // for render activity loader
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={styles.activityLoad}
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
                <View style={styles.listData}>
                    {this.dataList(item, key)}
                </View>
            </View>
        );
    };
    // for render list data 
    dataList = (item, key) => {
        return <View style={styles.contactInfo}>{this.ListData(item, key)}</View>;
    };
    // for design list data section 
    ListData = (item, key) => {
        return (
            <TouchableOpacity style={styles.mainBox}
                activeOpacity={0.9}
                onPress={() => this._onUpcomingDetails(item, key)}
            >
                <View style={styles.subBox}>
                    <View style={styles.BoxMarginSec}>
                        <View style={styles.skySmallBox} >
                            <Text style={styles.numberText}>{key.toString().length > 1 ? (key + 1) : "0" + (key + 1)}</Text>
                        </View>
                        <View style={styles.columnSec}>
                            <Text style={styles.auctionText}>{item.primevalue}</Text>
                            {/* <Text style={styles.auctionTypeText}>Auction Type</Text> */}
                        </View>
                        <View style={styles.dateSec}>
                            <View style={styles.dateSubSec}>
                                <View style={styles.skyNumberTextCircel} />
                                <View style={styles.dateTimeSec}>
                                    <Text style={styles.skySecDateText}>{item.startDate}</Text>
                                    <Text style={styles.skySectimeText}>{(item.startTime)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    };
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
                    {this.state.pageLoader ?
                        <View style={styles.loaderSec}>
                            <Loader />
                        </View> :
                        <React.Fragment>
                            {this.state.upcomingAuctionList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.upcomingAuctionList}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctioneerUpcomingListPage);
