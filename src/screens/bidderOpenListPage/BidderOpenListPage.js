import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, Dimension, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { Loader, NoDataFound } from '../../shared';
import Header from '../header';
import { modifyAuctioneerOpenList } from './Function';
import { CustomStyle } from '../style';
import socketServices from '../../services/api/models/socketService';

// this is bidder open list page 
class BidderOpenListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAuctionList: [],
            listLoader: true,
            totalDataCount: 0,
            pageNum: 0,
            limit: 10,
            refreshing: true,
            pageLoader: true,
            userData: {},
            firstDate: "",
            lastDate: "",


        }
    }
    //this is initial function which is call first 
    componentDidMount = async () => {
        // socketServices.initializeSocket();
        this._load();
        this.socketConnection()
    }

    componentWillUnmount() {
        // socket.removeAllListeners();
    }
    // for socket connection 
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        socketServices.emit("joinroom", { "roleid": userData.roleId });
    }
    // this is first function where set state data 
    _load = async () => {
        this.state.userData = await storageDataModification.userCredential({}, "get");
        this.setState({
            userData: this.state.userData,
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
    // for fetching live list data api call response 
    _apiCallRes = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "clientid": userData.clientid,
            "userid": userData.id,
            "status": [5],
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
                let auctioneerOpenList = await modifyAuctioneerOpenList(responseData);
                this.setState({
                    openAuctionList: [...this.state.openAuctionList, ...auctioneerOpenList.auctioneerOpenList],
                    totalDataCount: auctioneerOpenList.totalCount
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

    _onOpenDetails = (item, key) => {
        this.props.navigation.navigate("BidderListDetails", { data: item, status: 5, key: key.toString().length > 1 ? key + 1 : "0" + (key + 1) });

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
                if (this.state.openAuctionList.length >= this.state.totalDataCount) {
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
            openAuctionList: [],
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
            <View key={key} >
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.dataList(item, key)}
                </View>
            </View>
        );
    };
    // for render list data 
    dataList = (item, key) => {
        return <View style={styles.contactInfo}>{this.ListData(item, key)}</View>;
    };
    // for design list data 
    ListData = (item, key) => {
        return (
            <View style={styles.mainBox}>
                <TouchableOpacity style={styles.subBox}
                    activeOpacity={0.8}
                    onPress={() => this._onOpenDetails(item, key)}>
                    <View style={styles.BoxMarginSec}>
                        <View style={styles.violetSmallBox} >
                            <Text style={styles.numberText}>{key.toString().length > 1 ? (key + 1) : "0" + (key + 1)}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={styles.columnSec}>
                                <Text style={styles.auctionText}>{item.primevalue}</Text>
                            </View>
                            <View style={{ marginRight: '3%' }}>
                                <View style={styles.greenCircel}>
                                    <View style={styles.bigDeepgreenCircel} >
                                        <Image source={ImageName.WHITE_RIGHT_LOGO} style={styles.whiteRightLogo} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    };
    // for design list header section 
    listHeaderSection = () => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this._onBack()} activeOpacity={0.9}>
                    <Image source={ImageName.BACK_LOGO} style={styles.backImg} />
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
                            {this.state.openAuctionList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.openAuctionList}
                                        renderItem={({ item, index }) => this.renderContactList(item, index)}
                                        // keyExtractor={(item,) => key}
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
                                    <View style={{ height: 300 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BidderOpenListPage);
