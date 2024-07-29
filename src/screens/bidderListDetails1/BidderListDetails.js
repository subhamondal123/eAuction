import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, TextInput, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, FileDownload, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { BigTextButton, Loader, Modal, TextInputBox, Timer } from '../../shared';
import Header from '../header';
import { modifyActivityDetails, modifyAuctioneerLiveListDetails, modifyCategoryDetails, modifyPreviousProductDetails, modifyProductDetails, modifyRankDetails, modifyTearmsConditionDetails } from './Function';
import RenderHTML from 'react-native-render-html';
import { App_uri } from '../../services/config';
import socketServices from '../../services/api/models/socketService';
import { CryptoDecoder } from '../../services/auth';

const mixedStyle = {
    body: {
        whiteSpace: 'normal',
        color: '#aaa'
    },
    p: {
        color: '#828282',

    },
    h4: {
        color: '#000000'
    },
    ul: {
        color: '#828282'
    },
    li: {
        color: '#828282'
    }
}

const activeStyle = {
    body: {
        whiteSpace: 'normal',
        color: '#aaa',
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",

    },
    p: {
        color: '#828282',

    },
    h4: {
        color: 'red',

    },
    ul: {
        color: '#828282'
    },
    li: {
        color: '#828282'
    }
}

// this is bidder list details page 
class BidderListDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            liveDetailsShowHide: false,
            vendorShowHide: false,
            headerData: {},
            auctionDetails: {},
            productDetails: [],
            tearmsConditionModal: false,
            categoryDetails: {},
            tearmsDetails: "",
            status: this.props.route.params.status,
            productShowHide: false,
            priceText: "",
            priceActive: false,
            fridgeCostText: "",
            fridgeCostActive: false,
            userData: {},
            totalAmount: "",
            prevTotalAmount: "",
            isDecline: false,
            isReBid: false,
            priceLimit: "",
            confirmationModalVisible: false,
            rebiddingModalVisible: false,
            modArr: [],
            initialProductDetailsArr: [],
            bidHistoryDetailsArr: [],
            tearmsConditionData: [],
            showHideDataListData: false,
            isVisible: false,
            currentBidShowHide: true,
            previousBidShowHide: false,
            declineModal: false,
            declineText: "",
            declineModalActive: false,
            samePriceValid: false,
            activityDetails: [],
            rankData: [],
            rankAllId: "",
            liveStatus: false,
            declineStatus: false
        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        // socketServices.initializeSocket();

        if (this.state.status == 6 || this.state.status == 4) {
            this.socketConnection();
        }
        this._load();

    }

    componentWillUnmount() {
        // socket.removeAllListeners();
    }

    // for socket connection 
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get")

        socketServices.emit("joinroom", { "roleid": userData.roleId })
        socketServices.emit("specificAuctionRoom", { auctionid: Number(this.props.route.params.data.auctionfieldsvalueheaderid) });
        socketServices.on('aution_bid_response', async (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.response.enddatetime) {
                let date = new Date(Number(data.response.enddatetime))
                let hours = Number(date.getHours()) < 10 ? "0" + String(date.getHours()) : String(date.getHours());
                let minutes = Number(date.getMinutes()) < 10 ? "0" + String(date.getMinutes()) : String(date.getMinutes());
                let seconds = Number(date.getSeconds()) < 10 ? "0" + String(date.getSeconds()) : String(date.getSeconds());
                let newTime = hours + ":" + minutes + ":" + seconds;
                let day = Number(date.getDate()) < 10 ? "0" + String(date.getDate()) : String(date.getDate());
                let month = Number(date.getMonth() + 1) < 10 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                var newDate = date.getFullYear() + '-' + month + '-' + day
                let dataReq = {
                    clientid: userData.clientid,
                    auctionid: this.props.route.params.data.auctionfieldsvalueheaderid,
                    auctionendtime: newTime,
                    auctionenddate: newDate,
                }
                let responseData = await MiddlewareCheck("updateExtraTime", dataReq, this.props);
                if (responseData === false) {
                    this._onNetworkError()
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.setState({ pageLoader: true })
                        this._load();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }

            }
            if (data.message === 'Auction_Declined') {
                this.clearData();
                this.setState({
                    declineModal: false,
                    isDecline: true,
                    liveStatus: true
                })
            }
        });

        if (this.state.status == 4) {
            socketServices.on('dasboard_count_notify', async (data) => {
                this._onBack();

            })
        }

        socketServices.on('aution_bid_response_message', (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (data.message == "Your bid is applied successfully.") {
                    Toaster.ShortCenterToaster(data.message)
                    this.setState({ pageLoader: true, declineStatus: true })
                    this._load();
                } else if (data.message === 'delete_auction_bid') {
                    this.setState({ pageLoader: true, declineStatus: false })
                    this._load();
                }
            }
        });
    }
    // this is first function where set state data 
    _load = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({
            userData: userData
        })

        await this._apiCallRes();
        await this._categoryApiRes();
        await this.getDeclineBidCheck();
        await this.getPriceLimitPercentage();
        await this._productDetailsApiCall();
        await this._tearmsConditionApiRes();
        await this._activityLogApiRes();
        await this._bidderRankApiCall()
        this.setState({
            pageLoader: false,
        })
    };
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
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid
        }
        let responseData = await MiddlewareCheck("auctiondetails", dataReq, this.props);
        console.log("responseeeee---------", JSON.stringify(responseData))
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let auctioneerLiveListDetails = await modifyAuctioneerLiveListDetails(responseData);
                this.setState({
                    auctionDetails: auctioneerLiveListDetails.auctioneerLiveList[0],
                })

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }
    // for activity log api responce 
    _activityLogApiRes = async () => {
        this.setState({ activityLoader: true })
        let userCredential = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userCredential.clientid,
            "templateid": 1,
            "entitytypeid": userCredential.entitytypeid,
            "enttityid": userCredential.entityfieldmasterid,
            "roleid": userCredential.roleId,
            "auctionfieldsvalueheaderid": this.props.route.params.data.auctionfieldsvalueheaderid
        }
        let responseData = await MiddlewareCheck("activitylogs", dataReq, this.props);

        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let activityData = await modifyActivityDetails(responseData);
                this.setState({
                    activityDetails: activityData.activityDetails,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ activityLoader: false })
    }
    // for bidder rank api call 
    _bidderRankApiCall = async () => {

        let userData = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userData.clientid,
            "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": userData.entitytypeid,
            "enttityid": userData.entityfieldmasterid,
            "userid": userData.id,
            "roleid": userData.roleId,
            "templateid": 1,
            "status": 4,
            "algorithmid": 1,
            "limit": -1,
            "offset": -1
        }
        let responseData = await MiddlewareCheck("bidderList", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let userRankData = await modifyRankDetails(responseData);
                this.setState({
                    rankData: userRankData.rankDetails,
                })
                this._getAllRank(userRankData.rankDetails)

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    // for fetching all rank data 
    _getAllRank = async (arrData) => {
        let userData = await storageDataModification.userCredential({}, "get");
        let subArr = []
        if (arrData) {
            for (let i = 0; i < arrData.length; i++) {
                if (userData.entityfieldmasterid == arrData[i].vendorId) {
                    this.state.rankAllId = arrData[i].rank
                }
            }
        }
        this.setState({
            rankAllId: this.state.rankAllId
        })
    }
    // for fetching price limit percentage data 
    getPriceLimitPercentage = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            clientid: userInfo.clientid
        }
        let responseData = await MiddlewareCheck("auctionPriceLimitPercentage", dataReq, this.props);
        this.setState({
            priceLimit: responseData.response[0].pricelimit
        })
    }
    // for fetching decline check data 
    getDeclineBidCheck = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userData.clientid,
            "roleid": userData.roleId,
            "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": userData.entitytypeid,
            "enttityid": userData.entityfieldmasterid,
            "templateid": 1,
            "userid": userData.id
        }
        let responseData = await MiddlewareCheck("declineBid", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let totalCount = responseData.response[0].count;
                if (totalCount == 0) {
                    this.setState({
                        isDecline: false,
                        liveStatus: false
                    })
                } else {
                    this.setState({
                        isDecline: true,
                        liveStatus: true
                    })
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }
    // for product details api call 
    _productDetailsApiCall = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userData.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": 4,
            "enttityid": userData.entityfieldmasterid,
            "templateid": 1,
            "userid": userData.id

        }
        let responseData = await MiddlewareCheck("getVendorProductDetails", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let productDetails = await modifyProductDetails(responseData);
                let initialDetails = await modifyProductDetails(responseData);
                this.setState({
                    initialProductDetailsArr: initialDetails.productDetails
                })

                this._getTotalAmount(productDetails.productDetails);
                this.setState({
                    productDetails: productDetails.productDetails,

                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    // for get  total amount 
    _getTotalAmount = (arr) => {
        if (arr.length > 0) {
            let totalAmount = 0;
            for (let i = 0; i < arr.length; i++) {
                totalAmount = totalAmount + Number(arr[i].subAmount);
                if (arr[i].price.length > 0) {
                    this.setState({
                        isReBid: true
                    })
                } else {
                    this.setState({
                        isReBid: false
                    })
                }
            }
            this.state.totalAmount = totalAmount.toFixed(2);
            this.setState({
                totalAmount: this.state.totalAmount
            })
        }
    }
    // for get previous total amount
    getPreviousTotalAmount = (arr) => {
        if (arr.length > 0) {
            let totalAmount = 0;
            for (let i = 0; i < arr.length; i++) {
                totalAmount = totalAmount + Number(arr[i].subAmount);

                this.state.prevTotalAmount = totalAmount.toFixed(2);
                this.setState({
                    prevTotalAmount: this.state.prevTotalAmount
                })
            }
        }
    }
    // for category api call response 
    _categoryApiRes = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
        }
        let responseData = await MiddlewareCheck("getauctioncategory", dataReq, this.props);
        console.log("getauctioncategory", JSON.stringify(responseData))
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let categoryDetails = await modifyCategoryDetails(responseData);
                this.setState({
                    categoryDetails: categoryDetails.categoryDetails[0],
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    // for tearms condition api call response 
    _tearmsConditionApiRes = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "categoryid": this.state.categoryDetails.catevalid
        }
        let responseData = await MiddlewareCheck("tearmsConditionApi", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let tearmsConditionData = await modifyTearmsConditionDetails(responseData);
                this.setState({
                    tearmsDetails: tearmsConditionData.fieldvalue,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }


    onOpenModal = async () => {
        if (this.state.tearmsConditionModal == false) {
            this.setState({
                tearmsConditionModal: true
            })
        } else {
            this.setState({
                tearmsConditionModal: false
            })
        }
    }

    onOpenActivityModal = async () => {
        this.setState({
            isVisible: !this.state.isVisible
        })

        await this._activityLogApiRes();
    }
    onCloseActivityModal = async () => {
        if (this.state.isVisible == false) {
            this.setState({
                isVisible: true
            })
        } else {
            this.setState({
                isVisible: false
            })
        }
    }

    showHideVendorData = () => {
        this.setState({
            vendorShowHide: !this.state.vendorShowHide
        })
    }

    _onShowHide = () => {
        this.state.productShowHide = false
        this.setState({
            liveDetailsShowHide: !this.state.liveDetailsShowHide,
            productShowHide: this.state.productShowHide
        })
    }

    showHideData = () => {
        this.setState({
            showHideDataListData: !this.state.showHideDataListData
        })
    }

    showHideProductData = () => {
        this.state.liveDetailsShowHide = false
        this.setState({
            productShowHide: !this.state.productShowHide,
            liveDetailsShowHide: this.state.liveDetailsShowHide
        })
    }

    showHideCurrentBid = () => {
        if (this.state.currentBidShowHide == false) {
            this.setState({
                currentBidShowHide: true,
                previousBidShowHide: false
            })
        } else {
            this.setState({
                currentBidShowHide: false,
                previousBidShowHide: false
            })
        }
    }

    showHidePreviousBid = () => {
        if (this.state.previousBidShowHide == false) {
            this.setState({
                previousBidShowHide: true,
                currentBidShowHide: false,
            })
        } else {
            this.setState({
                previousBidShowHide: false,
                currentBidShowHide: false,
            })
        }
    }

    _onTextPrice = (value, key) => {
        let p = value.replace(/[,-]/g, '');

        let productDetail = this.state.productDetails;
        let total = 0;

        for (let i = 0; i < productDetail.length; i++) {
            if (i == key) {
                productDetail[i].price = p;
                let cgst = ((Number(productDetail[i].requiredQty) * Number(p) * (Number(productDetail[i].gst) / 2)) / 100).toFixed(2);
                let subTotal = ((Number(productDetail[i].requiredQty) * Number(p)) + Number(productDetail[i].frieght) + Number(cgst) + Number(cgst)).toFixed(2);
                productDetail[i].cgst = cgst;
                productDetail[i].sgst = cgst;
                productDetail[i].subAmount = subTotal;
            }
            total += Number(productDetail[i].subAmount);
        }
        this.state.productDetails = productDetail;
        this.state.totalAmount = total.toFixed(2);

        this.setState({
            productDetails: this.state.productDetails,
            totalAmount: this.state.totalAmount
        })
    }
    _onTextChangeFridgeCost = (value, key) => {
        let p = value.replace(/[,-]/g, '');

        let productDetail = this.state.productDetails;
        let total = 0;
        for (let i = 0; i < productDetail.length; i++) {
            if (i == key) {
                productDetail[i].frieght = p;

                let subTotal = ((Number(productDetail[i].requiredQty) * Number(productDetail[i].price)) + Number(p) + Number(productDetail[i].cgst) + Number(productDetail[i].cgst)).toFixed(2);

                productDetail[i].subAmount = subTotal;
            }
            total += Number(productDetail[i].subAmount);
        }
        this.state.productDetails = productDetail;
        this.state.totalAmount = total.toFixed(2);
        this.setState({
            productDetails: this.state.productDetails,
            totalAmount: this.state.totalAmount
        })
    }

    // for design list header section 
    listHeaderSection = () => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_LOGO} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
            </View>

        )
    }
    _openBidderList = () => {
        this.props.navigation.navigate("ListOfBidder", { data: this.props.route.params.data })
    }

    _timeOut = (it) => {
        Toaster.ShortCenterToaster("Your Live Auction Has Been Time out ")
        this.setState({
            liveStatus: true
        })
        // this.props.route.params.onReload();
        // this.props.navigation.goBack();
    }
    // for download documents
    downloadDoc = async (data) => {
        await FileDownload.downloadDocument(App_uri.UPLOAD_FILES + data);

    }
    // for design list details section 
    ListDetails = () => {
        return (
            <>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={styles.subBox}
                        activeOpacity={0.8}
                        onPress={() => this._onShowHide()}>
                        <View style={styles.BoxMarginSec}>
                            <View style={this.state.status == 6 ? styles.violetSmallBox : this.state.status == 4 ? styles.skySmallBox : styles.yellowSmallBox} >
                                <Text style={styles.numberText}>{this.props.route.params.key}</Text>
                            </View>
                            <View style={styles.BoxMarginSubSec}>
                                <View style={styles.columnSec}>
                                    <Text style={styles.auctionText}>{this.state.auctionDetails.primevalue}</Text>
                                </View>
                                <View style={styles.allItemSec}>
                                    {this.state.status == 4 ?
                                        <View style={styles.startEndTimeSec}>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.startDate}</Text>
                                            <Text style={styles.productUnitText}>{this.state.auctionDetails.endtime}</Text>
                                        </View> :
                                        this.state.status == 6 ?
                                            <>
                                                {this.state.liveStatus == false ?
                                                    <>
                                                        <View style={styles.liveGreenCircel}>
                                                            <View style={styles.deepGreenCircel} />
                                                        </View>
                                                        <View style={{ marginLeft: '6%' }}>
                                                            <View style={styles.violetLiveTextSec}>
                                                                <Text style={styles.textLive}>Live</Text>
                                                            </View>
                                                            <Timer
                                                                startTime={parseInt(this.state.auctionDetails.startDate)}
                                                                endTime={parseInt(this.state.auctionDetails.auctionEndTime)}
                                                                onTimeOut={() => this._timeOut()}
                                                                additionalTimerTextStyle={{ color: "#7E47F3" }}
                                                                additionalHrsTextStyle={{ color: "#8C8C8C" }} />
                                                        </View>
                                                    </> :
                                                    <View style={{ marginLeft: "55%" }}>
                                                        <View style={styles.yellowOpenTextSec}>
                                                            <Text style={styles.textLive}>Open</Text>
                                                        </View>
                                                    </View>
                                                }
                                            </>
                                            :
                                            <View style={{ marginLeft: '64%' }}>
                                                <View style={styles.greenCircel}>
                                                    <View style={styles.bigDeepgreenCircel} >
                                                        <Image source={ImageName.WHITE_RIGHT_LOGO} style={styles.whiteRightLogo} />
                                                    </View>
                                                </View>
                                            </View>
                                    }
                                    <Image source={this.state.liveDetailsShowHide == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.violetDropDownLogo} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.state.liveDetailsShowHide ?
                        <View>
                            <View style={{ backgroundColor: "#EBEBEB" }}>
                                <View style={{ marginHorizontal: '3%' }}>
                                    <View style={styles.auctionSec}>
                                        <View style={styles.typeSec}>
                                            <Text style={styles.productUnitText}>Auction Type</Text>
                                            <Text style={styles.valueText}>{this.state.categoryDetails.auctionval}</Text>
                                        </View>
                                        <View style={[styles.typeSec,{alignItems:"flex-end"}]}>
                                            <Text style={styles.productUnitText}>Auction Category</Text>
                                            <Text style={styles.valueText}>{this.state.categoryDetails.cateval}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.auctionSec}>
                                        <View style={styles.typeSec}>
                                            <Text style={styles.productUnitText}>Auction Start</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.startDate}</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.startTime}</Text>

                                        </View>
                                        <View style={styles.auctionEndSec}>
                                            <Text style={styles.productUnitText}>Auction End</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.endDate}</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.endtime}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.descSec}>
                                        <Text style={styles.valueText}>Auction Description</Text>
                                        <Text style={styles.productUnitText}>{this.state.auctionDetails.auctionDes == "" ? "N/A" : this.state.auctionDetails.auctionDes}</Text>
                                    </View>
                                    <View style={styles.descSec}>
                                        <Text style={styles.valueText}>Delivery Instruction</Text>
                                        <Text style={styles.productUnitText}>{this.state.auctionDetails.deliveryIns}</Text>
                                    </View>
                                    <View style={styles.descSec}>
                                        <Text style={styles.valueText}>File View</Text>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.downloadDoc(this.state.auctionDetails.auctionDescFile)}>
                                            <Text style={styles.productUnitText}>{this.state.auctionDetails.auctionDescFile}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 12 }} />
                            </View>
                        </View>
                        :
                        null
                    }
                </View >
            </>
        )
    };

    _onBid = async () => {
        let productDetails = this.state.productDetails;
        let initialProductdetails = this.state.initialProductDetailsArr;
        let priceInvalid = false;
        let initialPriceInvalid = false;
        let modArr = [];
        for (let i = 0; i < productDetails.length; i++) {
            if (this.state.isReBid == false) {
                if (productDetails[i].price == undefined || productDetails[i].price == null || productDetails[i].price.length == 0) {
                    Toaster.ShortCenterToaster("Please enter price !");
                    initialPriceInvalid = true;
                }
                if (Number(productDetails[i].price) > Number(productDetails[i].basePrice)) {
                    Toaster.ShortCenterToaster("The price must be lower or equal to the base price. !");
                    initialPriceInvalid = true;
                    break;
                }
                if ((Number(productDetails[i].price) < Number(productDetails[i].basePrice) - ((Number(productDetails[i].basePrice) * Number(this.state.priceLimit)) / 100))) {
                    Toaster.ShortCenterToaster("The price should not be less than " + this.state.priceLimit + "% of the base price.");
                    initialPriceInvalid = true;
                    priceInvalid = true;
                    break;
                }
            } else {
                if (productDetails[i].price == undefined || productDetails[i].price == null || productDetails[i].price.length == 0) {
                    Toaster.ShortCenterToaster("Please enter price !");
                    priceInvalid = true;
                }
                for (let j = 0; j < initialProductdetails.length; j++) {
                    if (i == j) {
                        if (productDetails[i].productid == initialProductdetails[j].productid) {
                            if (Number(productDetails[i].price) >= Number(initialProductdetails[j].price)) {
                                Toaster.ShortCenterToaster("The price must be lower to the previous price!");
                                priceInvalid = true;
                                break;
                            }
                            // console.log("productDetails[i].price---", productDetails[i].price)
                            // console.log("initialProductdetails[j].price---", initialProductdetails[j].price)
                            // console.log("initialProductdetails[j].tickSize---", typeof initialProductdetails[j].tickSize)
                            // console.log("this.state.samePriceValid", this.state.samePriceValid)
                            // console.log("initialProductdetails[j].tickSize.length !== 0 && this.state.samePriceValid == false", initialProductdetails[j].tickSize != 0 && this.state.samePriceValid == false)
                            // console.log("initialProductdetails[j].tickSize.length !== 0 && this.state.samePriceValid == true", initialProductdetails[j].tickSize.length != 0 && this.state.samePriceValid == true)
                            // console.log("check====", Number(productDetails[i].price) != (Number(initialProductdetails[j].price) - (Number(initialProductdetails[j].price) * (Number(initialProductdetails[j].tickSize) / 100))).toFixed(2))
                            if (initialProductdetails[j].tickSize != 0 && this.state.samePriceValid == false) {
                                if (Number(productDetails[i].price) != (Number(initialProductdetails[j].price) - (Number(initialProductdetails[j].price) * (Number(initialProductdetails[j].tickSize) / 100))).toFixed(2)) {
                                    Toaster.ShortCenterToaster("The price is not matched with the tick size or current price is same as previous!");
                                    priceInvalid = true;
                                    break
                                }
                            }
                            if (initialProductdetails[j].tickSize != 0 && this.state.samePriceValid == true) {
                                if (Number(productDetails[i].price) < (Number(initialProductdetails[j].price) - (Number(initialProductdetails[j].price) * (Number(initialProductdetails[j].tickSize) / 100))).toFixed(2)) {
                                    Toaster.ShortCenterToaster("The price is not matched with the tick size or current price is same as previous!");
                                    priceInvalid = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (priceInvalid == false && this.state.isReBid) {
            modArr = this.getModifiedProductData(productDetails);
            this.getPreviousbiddingHistoryDetails();
            this.setState({ rebiddingModalVisible: true, modArr: modArr, })
        }
        if (initialPriceInvalid == false && this.state.isReBid == false) {
            modArr = this.getModifiedProductData(productDetails);
            this.setState({ confirmationModalVisible: true, modArr: modArr, initialProductDetailsArr: initialProductdetails })
        }
        socketServices.on('aution_bid_response', async (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await this._bidderRankApiCall()
            }
        });
    }

    _onBidRequest = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "userid": this.state.userData.id,
            "entitytypeid": this.state.userData.entitytypeid,
            "enttityid": this.state.userData.entityfieldmasterid,
            "roleid": this.state.userData.roleId,
            "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "product": this.state.modArr,
            "status": 4,
            "algorithmid": 1
        }

        socketServices.emit("auction_bid", reqData);
        socketServices.on('aution_bid_response', async (data) => {

            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ isReBid: true })
            } else {
                this.setState({ isReBid: false })
            }
            if (data.response.enddatetime) {
                let date = new Date(Number(data.response.enddatetime))
                let hours = Number(date.getHours()) < 10 ? "0" + String(date.getHours()) : String(date.getHours());
                let minutes = Number(date.getMinutes()) < 10 ? "0" + String(date.getMinutes()) : String(date.getMinutes());
                let seconds = Number(date.getSeconds()) < 10 ? "0" + String(date.getSeconds()) : String(date.getSeconds());
                let newTime = hours + ":" + minutes + ":" + seconds;
                let day = Number(date.getDate()) < 10 ? "0" + String(date.getDate()) : String(date.getDate());
                let month = Number(date.getMonth() + 1) < 10 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                var newDate = date.getFullYear() + '-' + month + '-' + day
                let dataReq = {
                    clientid: userInfo.clientid,
                    auctionid: this.props.route.params.data.auctionfieldsvalueheaderid,
                    auctionendtime: newTime,
                    auctionenddate: newDate,
                }
                let responseData = await MiddlewareCheck("updateExtraTime", dataReq, this.props);
                if (responseData === false) {
                    this._onNetworkError()
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this._apiCallRes();
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }

            }
        })
        // socketServices.on('aution_bid_response', 
        // (data) => {

        //     console.log("normal resppp=====>", data);
        // if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //     this.setState({ isReBid: true })
        // } else {
        //     this.setState({ isReBid: false })
        // }
        // if (data.response.enddatetime) {
        //     let date = new Date(Number(data.response.enddatetime))
        //     let hours = Number(date.getHours()) < 10 ? "0" + String(date.getHours()) : String(date.getHours());
        //     let minutes = Number(date.getMinutes()) < 10 ? "0" + String(date.getMinutes()) : String(date.getMinutes());
        //     let seconds = Number(date.getSeconds()) < 10 ? "0" + String(date.getSeconds()) : String(date.getSeconds());
        //     let newTime = hours + ":" + minutes + ":" + seconds;
        //     let day = Number(date.getDate()) < 10 ? "0" + String(date.getDate()) : String(date.getDate());
        //     let month = Number(date.getMonth() + 1) < 10 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1);
        //     var newDate = date.getFullYear() + '-' + month + '-' + day
        //     let dataReq = {
        //         clientid: 1,
        //         auctionid: this.props.route.params.data.auctionfieldsvalueheaderid,
        //         auctionendtime: newTime,
        //         auctionenddate: newDate,
        //     }
        //     let responseData = await MiddlewareCheck("updateExtraTime", dataReq, this.props);
        //     if (responseData === false) {
        //         this._onNetworkError()
        //     } else {
        //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //             this._apiCallRes();
        //         } else {
        //             Toaster.ShortCenterToaster(responseData.message)
        //         }
        //     }

        // }
        // });
        socketServices.on('aution_bid_response_message', async (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {

                if (data.message == "Your bid is applied successfully.") {
                    Toaster.ShortCenterToaster(data.message);
                    this.setState({ pageLoader: true });
                    this._load()
                    this.setState({
                        declineStatus: true
                    })
                    // this._productDetailsApiCall();
                }
                this.setState({ confirmationModalVisible: false, rebiddingModalVisible: false })
            } else if (data.status == ErrorCode.ERROR.ERROR_CODE.INTERNAL_SERVER_ERROR) {
                if (data.message == "This Bid Price is already accepted by the system. Please try with another Bid Price.") {
                    Toaster.ShortCenterToaster(data.message);
                    this.state.samePriceValid = true;
                    this.setState({ rebiddingModalVisible: false, samePriceValid: this.state.samePriceValid })
                }
            }
        });
    }
    // for get modified product data 
    getModifiedProductData = (dataArr) => {
        if (dataArr) {
            let modArr = [];
            for (let i = 0; i < dataArr.length; i++) {
                let modArrData = [],
                    frieghtObj = {},
                    cgstObj = {},
                    sgstObj = {},
                    igstObj = {},
                    availableQtyObj = {},
                    subAmountObj = {},
                    tickSizeObj = {},
                    totalAmountObj = {},
                    priceObj = {};
                if (dataArr[i].frieghtPermission == 1) {
                    frieghtObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].frieghtFieldId,
                        "fieldvalue": dataArr[i].frieght,
                        "fielddesc": dataArr[i].frieghtFieldDesc,
                        "fieldlabeldesc": dataArr[i].frieghtFieldLabelDesc,
                        "permission": dataArr[i].frieghtPermission
                    }
                    modArrData.push(frieghtObj)
                }
                if (dataArr[i].pricePermission == 1) {
                    priceObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].priceFieldId,
                        "fieldvalue": dataArr[i].price,
                        "fielddesc": dataArr[i].priceFieldDesc,
                        "fieldlabeldesc": dataArr[i].priceFieldLabelDesc,
                        "permission": dataArr[i].pricePermission
                    }
                    modArrData.push(priceObj)
                }
                if (dataArr[i].tickSizePermission == 1) {
                    tickSizeObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].tickSizeFieldId,
                        "fieldvalue": dataArr[i].tickSize,
                        "fielddesc": dataArr[i].tickSizeFieldDesc,
                        "fieldlabeldesc": dataArr[i].tickSizeFieldLabelDesc,
                        "permission": dataArr[i].tickSizePermission
                    }
                    modArrData.push(tickSizeObj)
                }
                if (dataArr[i].availableQtyPermission == 1) {
                    availableQtyObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].availableQtyFieldId,
                        "fieldvalue": dataArr[i].requiredQty,
                        "fielddesc": dataArr[i].availableQtyFieldDesc,
                        "fieldlabeldesc": dataArr[i].availableQtyFieldLabelDesc,
                        "permission": dataArr[i].availableQtyPermission
                    }
                    modArrData.push(availableQtyObj)
                }
                if (dataArr[i].cgstPermission == 1) {
                    cgstObj = {
                        "productid": dataArr[i].productid, "productdesc": dataArr[i].productdesc,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].cgstFieldId,
                        "fieldvalue": dataArr[i].cgst,
                        "fielddesc": dataArr[i].cgstFieldDesc,
                        "fieldlabeldesc": dataArr[i].cgstFieldLabelDesc,
                        "permission": dataArr[i].cgstPermission
                    }
                    modArrData.push(cgstObj)
                }
                if (dataArr[i].sgstPermission == 1) {
                    sgstObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].sgstFieldId,
                        "fieldvalue": dataArr[i].sgst,
                        "fielddesc": dataArr[i].sgstFieldDesc,
                        "fieldlabeldesc": dataArr[i].sgstFieldLabelDesc,
                        "permission": dataArr[i].sgstPermission
                    }
                    modArrData.push(sgstObj)
                }
                if (dataArr[i].igstPermission == 1) {
                    igstObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].igstFieldId,
                        "fieldvalue": "",
                        "fielddesc": dataArr[i].igstFieldDesc,
                        "fieldlabeldesc": dataArr[i].igstFieldLabelDesc,
                        "permission": dataArr[i].igstPermission
                    }
                    modArrData.push(igstObj)
                }
                if (dataArr[i].subAmountPermission == 1) {
                    subAmountObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].subAmountFieldId,
                        "fieldvalue": dataArr[i].subAmount,
                        "fielddesc": dataArr[i].subAmountFieldDesc,
                        "fieldlabeldesc": dataArr[i].subAmountFieldLabelDesc,
                        "permission": dataArr[i].subAmountPermission
                    }
                    modArrData.push(subAmountObj)
                }
                if (dataArr[i].totalAmountPermission == 1) {
                    totalAmountObj = {
                        "productid": dataArr[i].productid,
                        "productdesc": dataArr[i].productdesc,
                        "fieldid": dataArr[i].totalAmountFieldId,
                        "fieldvalue": this.state.totalAmount,
                        "fielddesc": dataArr[i].totalAmountFieldDesc,
                        "fieldlabeldesc": dataArr[i].totalAmountFieldLabelDesc,
                        "permission": dataArr[i].totalAmountPermission
                    }
                    modArrData.push(totalAmountObj)
                }
                modArr.push(modArrData)
            }

            return modArr;

        }
    }

    getPreviousbiddingHistoryDetails = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "templateid": 1,
            "entitytypeid": this.state.userData.entitytypeid,
            "enttityid": this.state.userData.entityfieldmasterid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid
        }
        let responseData = await MiddlewareCheck("getBiddingHistoryDetails", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let prodDetails = await modifyPreviousProductDetails(responseData);
                this.getPreviousTotalAmount(prodDetails.productDetails);
                this.setState({
                    bidHistoryDetailsArr: prodDetails.productDetails
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }
    // for design product details section 
    productDetails = () => {
        return (
            <>
                <TouchableOpacity style={styles.bidderMainBox}
                    onPress={() => this.showHideProductData()}
                    activeOpacity={0.9}>
                    <View style={styles.bidderSubBox}>
                        <View style={styles.listBidderSec}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.bidderText}>Product Details</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                {this.state.rankAllId.length == 0 ?
                                    null :
                                    <Text style={styles.bidderText}>Your Rank:<Text style={{ color: Color.COLOR.VIOLET.LAVENDER_INDIGO, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{this.state.rankAllId.length == 0 ? "" : "#" + this.state.rankAllId}</Text></Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.detailsText}>Detail View</Text>
                                <View style={{ width: 15 }} />
                                <Image source={this.state.productShowHide == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.dropDownLogo} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {this.state.productShowHide ?
                    <View style={{ backgroundColor: '#F5F5F5' }}>
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {this.state.productDetails.map((item, key) => (
                                <View style={styles.itemListSec} key={key}>
                                    <View style={styles.nameGstSec}>
                                        <View style={styles.productFirstTxt}>
                                            <Text style={styles.productUnitText}>Product Name</Text>
                                            <Text style={styles.valueText}>{item.productdesc}</Text>
                                        </View>
                                        <View style={styles.productSecondTxt}>
                                            <Text style={styles.productUnitText}>(GST %)</Text>
                                            <Text style={styles.valueText}>{item.gst}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.unitQtySec}>
                                        <View style={styles.productFirstTxt}>
                                            <Text style={styles.productUnitText}>Product Unit</Text>
                                            <Text style={styles.valueText}>{item.unitdesc}</Text>
                                        </View>
                                        <View style={styles.productSecondTxt}>
                                            <Text style={styles.productUnitText}>Product Quantity</Text>
                                            <Text style={styles.valueText}>{item.requiredQty}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceSizeSec}>
                                        <View style={styles.productFirstTxt}>
                                            <Text style={styles.productUnitText}>Base Price</Text>
                                            <Text style={styles.valueText}>{'\u20B9' + " " + item.basePrice}</Text>
                                        </View>
                                        <View style={styles.productSecondTxt}>
                                            <Text style={styles.productUnitText}>Auction Tick Size(%)</Text>
                                            <Text style={styles.valueText}>{item.tickSize == "" ? "N/A" : item.tickSize}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.viewStyle} />
                                    <View style={{ marginTop: 10 }}>
                                        {this.state.isDecline ?
                                            null
                                            :
                                            <Text style={styles.bidProSentsTxt}>Put your bid for the product</Text>

                                        }
                                        <View style={styles.itemTxtInputSec}>
                                            <View style={styles.qtySec}>
                                                <Text style={styles.productUnitText}>Available Quantity</Text>
                                                <Text style={styles.valueText}>{item.requiredQty}</Text>
                                            </View>
                                            {this.state.isDecline ?
                                                <View style={styles.priceSec}>
                                                    <Text style={styles.productUnitText}>Price</Text>
                                                    <Text style={styles.valueText}>{item.price == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.price.toString()}</Text>
                                                </View>
                                                :
                                                <View style={styles.inputSec}>
                                                    <TextInputBox
                                                        placeholder={'\u20B9' + " " + "Price"}
                                                        value={item.price}
                                                        onChangeText={(value) => this._onTextPrice(value, key)}
                                                        keyboardType={"numeric"}
                                                        maxLength={16}
                                                        returnKeyType={"next"}
                                                        isActive={item.check}
                                                        editable={this.state.status == 6 ? this.state.isDecline == false ? this.state.liveStatus == false ? true : false : false : false}
                                                        onFocus={() => { item.check = true; this.setState({ productDetails: this.state.productDetails }) }}
                                                        onBlur={() => { item.check = false; this.setState({ productDetails: this.state.productDetails }) }}

                                                    />
                                                </View>
                                            }

                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={styles.itemTxtInputSec}>
                                            <View style={styles.cgstSec}>
                                                <Text style={styles.productUnitText}>CGST %</Text>
                                                <Text style={styles.valueGstText}>{item.cgst}</Text>
                                            </View>
                                            <View style={styles.sgstSec}>
                                                <Text style={styles.productUnitText}>SGST %</Text>
                                                <Text style={styles.valueGstText}>{item.sgst}</Text>
                                            </View>
                                            <View style={styles.igstSec}>
                                                <Text style={styles.productUnitText}>IGST %</Text>
                                                <Text style={styles.valueGstText}>{item.igst}</Text>
                                            </View>
                                            {this.state.isDecline ?
                                                <View style={styles.costSec}>
                                                    <Text style={styles.productUnitText}>Freight Cost</Text>
                                                    <Text style={styles.valueText}>{item.frieght == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.frieght}</Text>
                                                </View>
                                                :
                                                <View style={{ flex: 1, borderRadius: 12 }}>
                                                    <TextInputBox
                                                        placeholder={'\u20B9' + " " + "Frieght Cost"}
                                                        value={item.frieght}
                                                        onChangeText={(value) => this._onTextChangeFridgeCost(value, key)}
                                                        keyboardType={"numeric"}
                                                        maxLength={16}
                                                        isActive={item.tick}
                                                        borderRadius={14}
                                                        editable={this.state.status == 6 ? this.state.isDecline == false ? this.state.liveStatus == false ? true : false : false : false}
                                                        onFocus={() => { item.tick = true; this.setState({ productDetails: this.state.productDetails }) }}
                                                        onBlur={() => { item.tick = false; this.setState({ productDetails: this.state.productDetails }) }}
                                                    />
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.boxStyle} />
                                    <View style={styles.subTotalSec}>
                                        <Text style={styles.subTotalTxt}>Sub Total</Text>
                                        <Text style={styles.subAmountTxt}>{'\u20B9' + " " + item.subAmount}</Text>
                                    </View>
                                    <View style={{ marginBottom: 10 }} />
                                </View>
                            ))}
                        </ScrollView>
                        {this.state.status == 6 ?
                            <View style={{ marginHorizontal: '3%' }}>
                                <View style={styles.boxStyle} />
                                <View style={styles.totalAmntSec}>
                                    <Text style={styles.totalAmntTxt}>Total Amount</Text>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.EXTRA_BOLD }}>{'\u20B9' + " " + this.state.totalAmount}</Text>
                                </View>
                                <View style={styles.boxStyle} />
                                <View style={styles.detailTabSec}>
                                    <Text style={styles.tearmsCondiSec}>Read all tearms & condition before perticipate in the auction</Text>
                                    <TouchableOpacity onPress={() => this.onOpenModal()} activeOpacity={0.9}>
                                        <Text style={styles.detailTxt}>Detail</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.isDecline ?
                                    null
                                    :
                                    <View style={styles.bigBtnSec}>

                                        <BigTextButton
                                            height={50}
                                            borderRadius={15}
                                            backgroundColor={"#EBEBEB"}
                                            text={"Decline"}
                                            fontColor={"#2C3338"}
                                            isDisabled={this.state.liveStatus == false ? this.state.declineStatus == false ? false : true : true}
                                            onPress={() => this._onDeclineModal()}
                                        />

                                        <View style={{ width: 15 }} />
                                        <BigTextButton
                                            height={50}
                                            borderRadius={15}
                                            backgroundColor={"#7E47F3"}
                                            text={this.state.isReBid ? "Counter" : "Bid Now"}
                                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                            isDisabled={this.state.liveStatus == false ? false : true}
                                            onPress={() => this._onBid()}
                                        />
                                    </View>
                                }
                                <View style={{ height: 20 }} />

                            </View> :
                            null
                        }
                    </View> :
                    null
                }
            </>
        )
    }

    // for design modal section 
    modalSection = () => {
        return (
            <>
                <Modal isVisible={this.state.tearmsConditionModal}
                    // onBackdropPress={() => this.onOpenModal()}
                    onBackButtonPress={() => this.onOpenModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={styles.boxSideSpace}>
                                <View style={styles.pinkSmallBox} >
                                    <Image source={ImageName.WHITE_ACTIVITY_LOGO} style={styles.whiteActivityLogImg} />
                                </View>
                                <Text style={styles.textActivityLog}>Terms & Condition</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                    onPress={() => this.onOpenModal()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.underline} />
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.modalMarginSec}>
                                    <RenderHTML
                                        tagsStyles={mixedStyle}
                                        contentWidth={Dimension.width}
                                        source={{ html: this.state.tearmsDetails }}
                                    />
                                </View>
                            </ScrollView>
                            <View style={{ marginBottom: 20 }} />
                        </View>


                    }
                />

            </>
        )
    }
    // for design activity modal section 
    activityLogModal = () => {
        return (
            <Modal isVisible={this.state.isVisible}
                onBackButtonPress={() => this.onCloseActivityModal()}
                children={
                    <View style={styles.activityModalview}>

                        <View style={styles.boxSideSpace}>
                            <View style={styles.pinkSmallBox} >
                                <Image source={ImageName.WHITE_ACTIVITY_LOGO} style={styles.whiteActivityLogImg} />
                            </View>
                            <Text style={styles.textActivityLog}>Activity Log</Text>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                onPress={() => this.onCloseActivityModal()}
                                activeOpacity={0.9}>
                                <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.underline} />
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {this.state.activityLoader ?
                                <View style={styles.activityLoad}>
                                    <ActivityIndicator />
                                </View> :
                                <View style={styles.modalMarginSec}>
                                    {this.state.activityDetails.map((item, key) => (
                                        <React.Fragment key={key}>
                                            <View style={{ marginTop: 15 }}>
                                                <View style={styles.itemDataSec}>
                                                    <View style={{ marginHorizontal: '5%' }}>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Image source={ImageName.BALCK_GRAY_CALENDER} style={styles.blackGreyImg} />
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.dateText}>{DateConvert.viewDateFormat(item.time)}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Update By:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.userfirstname + " " + item.userlastname}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Action:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.activityname}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.priceText}>Company Name:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.priceValueText}>{item.primarykeyvalue}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Role Name:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.rolename}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.itemSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <RenderHTML
                                                                    tagsStyles={item.strikeThroughCheck == false ? mixedStyle : activeStyle}
                                                                    contentWidth={Dimension.width}
                                                                    source={{ html: item.activitylog }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </React.Fragment>
                                    ))}
                                </View>
                            }

                        </ScrollView>
                        <View style={{ marginBottom: 40 }} />
                    </View>


                }
            />
        )
    }

    _onConfirmModal = () => {
        if (this.state.confirmationModalVisible == false) {
            this.setState({
                confirmationModalVisible: true
            })
        } else {
            this.setState({
                confirmationModalVisible: false
            })
        }
    }

    _onRebiddingModal = () => {
        if (this.state.rebiddingModalVisible == false) {
            this.setState({
                rebiddingModalVisible: true
            })
        } else {
            this.setState({
                rebiddingModalVisible: false
            })
        }
    }

    _onDeclineModal = () => {
        this.clearData();
        this.setState({
            declineModal: !this.state.declineModal
        })
    }

    _onChangeDeclineText = (value) => {
        this.setState({
            declineText: value
        })
    }
    // for design confirm modal 
    confirmationModal = () => {
        return (
            <>
                <Modal isVisible={this.state.confirmationModalVisible}
                    // onBackdropPress={() => this.onOpenModal()}
                    onBackButtonPress={() => this._onConfirmModal()}
                    children={
                        <View style={styles.selectionModalview}>
                            <View style={styles.selectionBoxSideSpace}>
                                <Text style={styles.textActivityLog}>Confirmation</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                    onPress={() => this._onConfirmModal()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.selectionUnderline} />
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.modalMarginSec}>
                                    {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>{"Thank you for selecting the successful bidder. It is assumed that all due procedures are followed to select the bidder for this Auction. Please note that with the selection, the auction would be closed. Please select a proper closure code and submit a comment."}</Text> */}
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 10 }}>Do you really want to apply the bid? This process cannot be undone.</Text>
                                    <View style={styles.txtBtn}>
                                        <BigTextButton
                                            height={35}
                                            borderRadius={8}
                                            backgroundColor={"#EBEBEB"}
                                            text={"Cancel"}
                                            fontColor={"#2C3338"}
                                            onPress={() => this._onConfirmModal()}
                                        />
                                        <View style={{ width: 15 }} />
                                        <BigTextButton
                                            height={35}
                                            borderRadius={8}
                                            backgroundColor={"#7E47F3"}
                                            text={"Apply"}
                                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                            onPress={() => this._onBidRequest()}
                                        />
                                    </View>

                                </View>
                            </ScrollView>
                            <View style={{ marginBottom: 20 }} />
                        </View>
                    }
                />
            </>
        )
    }
    // for design re biddin modal 
    reBiddingModal = () => {
        const previousBid = () => {
            return (
                <>
                    {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginTop: 10 }}>Previous Bid</Text> */}
                    <TouchableOpacity style={styles.bidderMainBox}
                        onPress={() => this.showHidePreviousBid()}
                        activeOpacity={0.9}>
                        <View style={styles.bidderSubBox}>
                            <View style={styles.listBidderSec}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.bidderText}>Previous Bid</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.detailsText}>Detail View</Text>
                                    <View style={{ width: 15 }} />
                                    <Image source={this.state.previousBidShowHide == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.dropDownLogo} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.state.previousBidShowHide ?
                        <View style={styles.bidDataSec}>
                            <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                {this.state.bidHistoryDetailsArr.map((item, key) => (
                                    <View style={{ marginHorizontal: '3%' }} key={key}>
                                        <View style={styles.nameUnitSec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Product Name</Text>
                                                <Text style={styles.valueText}>{item.productdesc}</Text>
                                            </View>
                                            {/* <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-end' }}>
                                            <Text style={styles.productUnitText}>(GST %)</Text>
                                            <Text style={styles.valueText}>{item.gst}</Text>
                                         </View> */}
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>Product Unit</Text>
                                                <Text style={styles.valueText}>{item.unitdesc}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                        <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-start' }}>
                                            <Text style={styles.productUnitText}>Product Unit</Text>
                                            <Text style={styles.valueText}>{item.unitdesc}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-end' }}>
                                            <Text style={styles.productUnitText}>Product Quantity</Text>
                                            <Text style={styles.valueText}>{item.requiredQty}</Text>
                                        </View>
                                    </View> */}

                                        <View style={styles.qtyPriceSec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Available Quantity</Text>
                                                <Text style={styles.valueText}>{'\u20B9' + " " + item.availableQty}</Text>
                                            </View>
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>Price</Text>
                                                <Text style={styles.valueText}>{item.price == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.price}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={{ borderColor: "#CECECE", borderWidth: 0.7, marginTop: 15 }} /> */}

                                        <View style={{ marginTop: 10 }}>
                                            <View style={styles.parsentageSec}>
                                                <View style={styles.cgstSec}>
                                                    <Text style={styles.productUnitText}>CGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.cgst}</Text>
                                                </View>
                                                <View style={styles.sgstSec}>
                                                    <Text style={styles.productUnitText}>SGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.sgst}</Text>
                                                </View>
                                                <View style={styles.igst}>
                                                    <Text style={styles.productUnitText}>IGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.igst}</Text>
                                                </View>
                                                <View style={styles.costSec}>
                                                    <Text style={styles.productUnitText}>Frieght Cost</Text>
                                                    <Text style={styles.valueText}>{item.frieght == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.frieght}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.subTotal2Sec}>
                                            <View style={styles.subTotalSubSec}>
                                                <Text style={styles.productUnitText}>Sub Total</Text>
                                                <Text style={[styles.valueText, { fontSize: 12 }]}>{'\u20B9' + " " + item.subAmount}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.underline} />
                                        <View style={{ marginBottom: 10 }} />
                                    </View>
                                ))}

                                {this.state.status == 6 ?
                                    <View style={{ marginHorizontal: '3%' }}>
                                        <View style={styles.boxStyle} />
                                        <View style={styles.totalAmntSec}>
                                            <Text style={styles.totalAmnt2Txt}>Total Amount</Text>
                                            <Text style={styles.totalAmnt2}>{'\u20B9' + " " + this.state.prevTotalAmount}</Text>
                                        </View>
                                        <View style={styles.boxStyle} />

                                        <View style={{ height: 20 }} />

                                    </View> :
                                    null
                                }
                            </ScrollView>
                        </View>
                        :
                        null
                    }
                </>
            )
        }

        // for design current bid section 
        const currentBid = () => {
            return (
                <>
                    <TouchableOpacity style={styles.bidderMainBox}
                        onPress={() => this.showHideCurrentBid()}
                        activeOpacity={0.9}>
                        <View style={styles.bidderCurrentSubBox}>
                            <View style={styles.listBidderSec}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.bidderText}>Current Bid</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.detailsText}>Detail View</Text>
                                    <View style={{ width: 15 }} />
                                    <Image source={this.state.currentBidShowHide == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.dropDownLogo} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {this.state.currentBidShowHide ?
                        <View style={styles.currentBidSec}>
                            <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                {this.state.productDetails.map((item, key) => (
                                    <View style={{ marginHorizontal: '3%' }} key={key}>
                                        <View style={styles.nameGstSec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Product Name</Text>
                                                <Text style={styles.valueText}>{item.productdesc}</Text>
                                            </View>
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>(GST %)</Text>
                                                <Text style={styles.valueText}>{item.gst}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.unitQtySec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Product Unit</Text>
                                                <Text style={styles.valueText}>{item.unitdesc}</Text>
                                            </View>
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>Product Quantity</Text>
                                                <Text style={styles.valueText}>{item.requiredQty}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.priceSizeSec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Base Price</Text>
                                                <Text style={styles.valueText}>{'\u20B9' + " " + item.basePrice}</Text>
                                            </View>
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>Auction Tick Size(%)</Text>
                                                <Text style={styles.valueText}>{item.tickSize == "" ? "N/A" : item.tickSize}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.qtyPriceSec}>
                                            <View style={styles.productFirstTxt}>
                                                <Text style={styles.productUnitText}>Available Quantity</Text>
                                                <Text style={styles.valueText}>{'\u20B9' + " " + item.availableQty}</Text>
                                            </View>
                                            <View style={styles.productSecondTxt}>
                                                <Text style={styles.productUnitText}>Price</Text>
                                                <Text style={styles.valueText}>{item.price == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.price}</Text>
                                            </View>
                                        </View>
                                        {/* <View style={{ borderColor: "#CECECE", borderWidth: 0.7, marginTop: 15 }} /> */}

                                        <View style={{ marginTop: 10 }}>
                                            <View style={styles.parsentageSec}>
                                                <View style={styles.cgstSec}>
                                                    <Text style={styles.productUnitText}>CGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.cgst}</Text>
                                                </View>
                                                <View style={styles.sgstSec}>
                                                    <Text style={styles.productUnitText}>SGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.sgst}</Text>
                                                </View>
                                                <View style={styles.igstSec}>
                                                    <Text style={styles.productUnitText}>IGST %</Text>
                                                    <Text style={styles.valueGstText}>{item.igst}</Text>
                                                </View>
                                                <View style={styles.costSec}>
                                                    <Text style={styles.productUnitText}>Frieght Cost</Text>
                                                    <Text style={styles.valueText}>{item.frieght == "" ? '\u20B9' + " " + 0 : '\u20B9' + " " + item.frieght}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.subTotal2Sec}>
                                            <View style={styles.subTotalSubSec}>
                                                <Text style={styles.productUnitText}>Sub Total</Text>
                                                <Text style={[styles.valueText, { fontSize: 12 }]}>{'\u20B9' + " " + item.subAmount}</Text>
                                            </View>

                                        </View>
                                        <View style={styles.underline} />

                                        <View style={{ marginBottom: 10 }} />
                                    </View>
                                ))}

                                {this.state.status == 6 ?
                                    <View style={{ marginHorizontal: '3%' }}>
                                        <View style={styles.boxStyle} />
                                        <View style={styles.totalAmntSec}>
                                            <Text style={styles.totalAmnt2Txt}>Total Amount</Text>
                                            <Text style={styles.totalAmnt2}>{'\u20B9' + " " + this.state.totalAmount}</Text>
                                        </View>
                                        <View style={styles.boxStyle} />

                                        <View style={{ height: 20 }} />

                                    </View> :
                                    null
                                }
                            </ScrollView>
                        </View>
                        :
                        null
                    }

                </>
            )
        }
        return (
            <>
                <Modal isVisible={this.state.rebiddingModalVisible}
                    // onBackdropPress={() => this.onOpenModal()}
                    onBackButtonPress={() => this._onRebiddingModal()}
                    children={
                        <View style={styles.selectionModalview}>
                            <View style={styles.selectionBoxSideSpace}>
                                <Text style={styles.textActivityLog}>Confirmation</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                    onPress={() => this._onRebiddingModal()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.selectionUnderline} />


                            <View style={styles.modalRebidMarginSec}>
                                {currentBid()}
                                {previousBid()}

                                <View style={styles.txtBtn}>
                                    <BigTextButton
                                        height={35}
                                        borderRadius={8}
                                        backgroundColor={"#EBEBEB"}
                                        text={"Cancel"}
                                        fontColor={"#2C3338"}
                                        onPress={() => this._onRebiddingModal()}
                                    />
                                    <View style={{ width: 15 }} />
                                    <BigTextButton
                                        height={35}
                                        borderRadius={8}
                                        backgroundColor={"#7E47F3"}
                                        text={"Confirm"}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        onPress={() => this._onBidRequest()}
                                    />
                                </View>

                            </View>
                            {/* </ScrollView> */}
                            <View style={{ marginBottom: 20 }} />
                        </View>
                    }
                />
            </>
        )
    }

    clearData = () => {
        this.state.declineText = "";
        this.setState({
            declineText: this.state.declineText
        })

    }

    _onPressDecline = async () => {
        let today = Date.parse(new Date())
        let userData = await storageDataModification.userCredential({}, "get");
        if (this.state.declineText == "" || this.state.declineText == null || this.state.declineText == undefined) {
            Toaster.ShortCenterToaster("Please Enter your reason")
        } else {
            let reqData = {
                "clientid": userData.clientid,
                "templateid": 1,
                "userid": userData.id,
                "entitytypeid": userData.entitytypeid,
                "enttityid": userData.entityfieldmasterid,
                "roleid": userData.roleId,
                "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
                "declinecomment": this.state.declineText,
                "today": today,
            }
            socketServices.emit("decline_auction", reqData);
            socketServices.on('aution_bid_response', (data) => {
                data.response = CryptoDecoder.CryptoDecode(data.response);
                if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.clearData();
                    this.setState({
                        declineModal: false,
                        isDecline: true,
                        liveStatus: true
                    })
                }
            });
            socketServices.on('aution_bid_response_message', (data) => {
                data.response = CryptoDecoder.CryptoDecode(data.response);
                if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(data.message);
                }
            });
        }
    }

    // for design decline modal section 
    declineModalSection = () => {
        return (
            <>
                <Modal isVisible={this.state.declineModal}
                    // onBackdropPress={() => this.onOpenModal()}
                    onBackButtonPress={() => this._onDeclineModal()}
                    children={
                        <View style={styles.modalview}>
                            <View style={styles.boxSideSpace}>
                                <View style={styles.blueSmallBox} >
                                    <Image source={ImageName.WHITE_ACTIVITY_LOGO} style={styles.whiteActivityLogImg} />
                                </View>
                                <Text style={styles.textActivityLog}>Reason for Decline</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                    onPress={() => this._onDeclineModal()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.underline} />
                            <View style={styles.txtInputBtn}>
                                <TextInputBox
                                    placeholder={"Please give a reason for your decline"}
                                    value={this.state.declineText}
                                    onChangeText={(value) => this._onChangeDeclineText(value)}
                                    height={110}
                                    isActive={this.state.declineModalActive}
                                    borderRadius={14}
                                    onFocus={() => { this.setState({ declineModalActive: true }) }}
                                    onBlur={() => { this.setState({ declineModalActive: false }) }}
                                    alignItems={"flex-start"}
                                    multiline={true}
                                />
                                <View style={styles.bigTxtBtn}>
                                    <BigTextButton
                                        height={50}
                                        borderRadius={15}
                                        backgroundColor={"#EBEBEB"}
                                        text={"Cancel"}
                                        fontColor={"#2C3338"}
                                        onPress={() => this._onDeclineModal()}
                                    />
                                    <View style={{ width: 15 }} />
                                    <BigTextButton
                                        height={50}
                                        borderRadius={15}
                                        backgroundColor={"#7E47F3"}
                                        text={"Decline"}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        onPress={() => this._onPressDecline()}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 20 }} />
                        </View>


                    }
                />

            </>
        )
    }

    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} />
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <>
                        <View style={styles.space}>
                            {this.listHeaderSection()}
                            <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                {this.ListDetails()}
                                {this.productDetails()}
                                <View style={styles.activityLogSec}>
                                    <Text style={styles.activityLogTxt}>Activity Log</Text>
                                    <TouchableOpacity style={styles.activityLogBox} onPress={() => this.onOpenActivityModal()} activeOpacity={0.9}>
                                        <Text style={styles.textActivityLog}>Activity Log</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginBottom: 150 }} />

                            </ScrollView>
                        </View>
                    </>
                }
                {this.modalSection()}
                {this.activityLogModal()}
                {this.confirmationModal()}
                {this.reBiddingModal()}
                {this.declineModalSection()}

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

export default connect(mapStateToProps, mapDispatchToProps)(BidderListDetails);
