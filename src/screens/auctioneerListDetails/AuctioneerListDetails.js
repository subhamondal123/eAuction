import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, FileDownload, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { Loader, Modal, Timer } from '../../shared';
import { App_uri } from '../../services/config';
import Header from '../header';
import { modifyActivityDetails, modifyAuctioneerLiveListDetails, modifyCategoryDetails, modifyProductDetails, modifyTearmsConditionDetails, modifyVendorDetails } from './Function';
import RenderHTML from 'react-native-render-html';
import socket from '../../services/api/models/socketApiModule';
import socketServices from '../../services/api/models/socketService';
import { CryptoDecoder } from '../../services/auth';

const mixedStyle = {
    body: {
        whiteSpace: 'normal',
        color: '#aaa'
    },
    p: {
        color: '#828282'
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
// this is auctioneer list details page 
class AuctioneerListDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            liveDetailsShowHide: false,
            vendorShowHide: false,
            headerData: {},
            auctionDetails: {},
            productDetails: [],
            vendorDetails: [],
            tearmsConditionModal: false,
            categoryDetails: {},
            tearmsDetails: "",
            status: this.props.route.params.status,
            isVisible: false,
            activityDetails: [],

            tearmsConditionData: [],
            showHideDataListData: false,
            liveStatus: false


        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        // socketServices.initializeSocket();
        if (this.state.status == 6) {
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

                let userInfo = await storageDataModification.userCredential({}, "get");
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
            if (data.message == "Auction_Declined") {
                this._activityLogApiRes();
            } else {
                this._activityLogApiRes();
            }
        })

        socketServices.on('aution_bid_response_message', (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (data.message == "Your bid is applied successfully.") {
                    Toaster.ShortCenterToaster(data.message)
                    this.setState({ pageLoader: true })
                    this._load();
                } else if (data.message === 'delete_auction_bid') {
                    this.setState({ pageLoader: true, })
                    this._load();
                }
            }
        });
    }

    // this is first function where set state data 
    _load = async () => {
        await this._apiCallRes();
        await this._productDetailsApiCall();
        await this._vendorDetailsApiCall();
        await this._categoryApiRes();
        await this._tearmsConditionApiRes();
        await this._activityLogApiRes();
        this.setState({
            pageLoader: false
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
    // product details api call responce//
    _productDetailsApiCall = async () => {
        let userCredential = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userCredential.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": userCredential.entitytypeid

        }
        let responseData = await MiddlewareCheck("getproductdetails", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let productDetails = await modifyProductDetails(responseData);
                this.setState({
                    productDetails: productDetails.productDetails,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    // for vendor details api call responce 
    _vendorDetailsApiCall = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
        }
        let responseData = await MiddlewareCheck("vendordetails", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let vendorDetails = await modifyVendorDetails(responseData);
                this.setState({
                    vendorDetails: vendorDetails.vendorListDetails,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    // for category api call responce 
    _categoryApiRes = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
        }
        let responseData = await MiddlewareCheck("getauctioncategory", dataReq, this.props);
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
    // for tearms condition api call responce 
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
    // for activity log api call responce 
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
        // console.log(">>>>>>>>ActivityResponce", JSON.stringify(responseData))
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



    // for visible model 
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

    showHideVendorData = () => {
        this.state.liveDetailsShowHide = false
        this.setState({
            vendorShowHide: !this.state.vendorShowHide,
            liveDetailsShowHide: this.state.liveDetailsShowHide

        })
    }

    _onShowHide = () => {
        this.state.vendorShowHide = false
        this.setState({
            liveDetailsShowHide: !this.state.liveDetailsShowHide,
            vendorShowHide: this.state.vendorShowHide,
        })
    }

    showHideData = () => {
        this.setState({
            showHideDataListData: !this.state.showHideDataListData
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
    // for design circle logo section 
    circelLogo = () => {
        return (
            <>
                <View style={styles.twelvePointBurst}>
                    <View style={styles.twelvePointBurstMain} />
                    <View style={styles.twelvePointBurst30} />
                    <View style={styles.twelvePointBurst60} >
                        <Text style={styles.circleLogoTxt}>06</Text>
                    </View>
                </View>
            </>

        );
    };

    onOpenActivityModal = async () => {
        this.setState({
            isVisible: !this.state.isVisible
        })

        await this._activityLogApiRes();
    }

    _openBidderList = () => {
        this.props.navigation.navigate("ListOfBidder", { data: this.props.route.params.data, status: this.state.status, onReloadData: this.props.route.params.onReload })
    }

    _timeOut = (it) => {
        Toaster.ShortCenterToaster("Your Live Auction Has Been Time out ")
        this.setState({
            liveStatus: true
        })
        // this.props.navigation.goBack();
        // this.props.route.params.onReload();

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
                            <View style={styles.mainListSec}>
                                <View style={styles.columnSec}>
                                    <Text style={styles.auctionText}>{this.state.auctionDetails.primevalue}</Text>
                                </View>
                                <View style={styles.listTxtSec}>
                                    {this.state.status == 4 ?
                                        <View style={styles.dateTxtSec}>
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
                                                                endTime={parseInt(this.state.auctionDetails.actualEndTime)}
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
                                                        <Image source={ImageName.WHITE_RIGHT_LOGO} style={styles.whiteLogo} />
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
                                    <View style={styles.typeCategoryTxtSec}>
                                        <View style={styles.typeTxtSec}>
                                            <Text style={styles.productUnitText}>Auction Type</Text>
                                            <Text style={styles.valueText}>{this.state.categoryDetails.auctionval}</Text>
                                        </View>
                                        <View style={styles.categoryTxtSec}>
                                            <Text style={styles.productUnitText}>Auction Category</Text>
                                            <Text style={styles.valueText}>{this.state.categoryDetails.cateval}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.startEndTxtSec}>
                                        <View style={styles.startTxtSec}>
                                            <Text style={styles.productUnitText}>Auction Start</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.startDate}</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.startTime}</Text>

                                        </View>
                                        <View style={styles.endTxtSec}>
                                            <Text style={styles.productUnitText}>Auction End</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.endDate}</Text>
                                            <Text style={styles.valueText}>{this.state.auctionDetails.endtime}</Text>

                                        </View>
                                    </View>
                                    <View style={styles.descSec}>
                                        <Text style={styles.valueText}>Auction Description</Text>
                                        <Text style={styles.productUnitText}>{this.state.auctionDetails.auctionDes}</Text>
                                    </View>
                                    <View style={styles.instructSec}>
                                        <Text style={styles.valueText}>Delivery Instruction</Text>
                                        <Text style={styles.productUnitText}>{this.state.auctionDetails.deliveryIns}</Text>
                                    </View>
                                    <View style={styles.viewSec}>
                                        <Text style={styles.valueText}>File View</Text>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.downloadDoc(this.state.auctionDetails.auctionDescFile)}>
                                            <Text style={styles.productUnitText}>{this.state.auctionDetails.auctionDescFile}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 12 }} />
                            </View>
                            {this.state.productDetails.map((item, key) => (

                                <View style={{ marginHorizontal: '3%' }} key={key}>
                                    <View style={{ marginTop: 15 }} />
                                    {/* <Text style={styles.deliveryLocationText}>Delivery Location</Text>
                                    <Text style={styles.valueText}>Kolkata</Text> */}
                                    <View style={styles.viewStyle} />
                                    <View style={styles.productNameSec}>
                                        <View style={styles.nameTxtSec}>
                                            <Text style={styles.productUnitText}>Product Name</Text>
                                            <Text style={styles.valueText}>{item.productdesc}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 0.5, alignItems: 'flex-end' }}>
                                            {/* <Text style={styles.productUnitText}>Product Description</Text>
                                            <Text style={styles.valueText}>{item.unitdesc}</Text> */}
                                        </View>
                                    </View>
                                    <View style={styles.unitQtySec}>
                                        <View style={styles.unitTxtSec}>
                                            <Text style={styles.productUnitText}>Product Unit</Text>
                                            <Text style={styles.valueText}>{item.unitdesc}</Text>
                                        </View>
                                        <View style={styles.qtyTxtSec}>
                                            <Text style={styles.productUnitText}>Product Quantity</Text>
                                            <Text style={styles.valueText}>{item.quantityReq}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceSizeSec}>
                                        <View style={styles.priceTxtSec}>
                                            <Text style={styles.productUnitText}>Base Price</Text>
                                            <Text style={styles.valueText}>{item.basePrice}</Text>
                                        </View>
                                        <View style={styles.sizeTxtSec}>
                                            <Text style={styles.productUnitText}>Auction Tick Size(%)</Text>
                                            <Text style={styles.valueText}>{item.auctionticksize == "" ? "N/A" : item.auctionticksize}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.viewStyle} />
                                </View>
                            ))}
                            <View style={styles.detailsTabSec}>
                                <Text style={styles.readAllTxt}>Read all tearms & condition before perticipate in the auction</Text>
                                <TouchableOpacity onPress={() => this.onOpenModal()} activeOpacity={0.9}>
                                    <Text style={styles.detailsTxt}>Detail</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginBottom: 30 }} />
                        </View>
                        :
                        null
                    }
                </View >
            </>

        )
    };
    // for design vendor details section 
    VendorDetails = () => {
        return (
            <>
                <TouchableOpacity style={styles.bidderMainBox}
                    onPress={() => this.showHideVendorData()}
                    activeOpacity={0.9}>
                    <View style={styles.bidderSubBox}>
                        <View style={styles.listBidderSec}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.bidderText}>Vendors</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.detailsText}>Detail View</Text>
                                <View style={{ width: 15 }} />
                                <Image source={this.state.vendorShowHide == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.dropDownLogo} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.state.vendorShowHide == true ?
                        <>
                            <View style={styles.listSec} >
                                {this.state.vendorDetails.map((item, key) => (
                                    <React.Fragment key={key}>
                                        <View style={{ marginTop: 15 }}>
                                            <View style={styles.whiteBox}>
                                                <Text style={styles.keyValueTxt}>{(item.index + 1) + ". " + item.primarykeyvalue}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: 8 }} />
                                    </React.Fragment>
                                ))}
                            </View>
                        </> :
                        null

                    }
                </ScrollView>
            </>
        )
    }
    // for design bidder list data 
    bidderListData = () => {
        return (
            <>
                <TouchableOpacity style={styles.bidderMainBox}
                    activeOpacity={0.9}
                    onPress={() => this._openBidderList()}
                >
                    <View style={styles.bidderSubBox}>
                        <View style={styles.listBidderSec}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.bidderText}>List of Bidder</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.detailsText}>Detail View</Text>
                                <View style={{ width: 15 }} />
                                <Image source={this.state.showHideDataListData == true ? ImageName.DROP_DOWN_UP_ARROW : ImageName.VIOLET_DOWN_LOGO} style={styles.dropDownLogo} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

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

    // for design activity log modal 
    activityLogModal = () => {
        return (
            <Modal isVisible={this.state.isVisible}
                onBackdropPress={() => this.onOpenActivityModal()}
                onBackButtonPress={() => this.onOpenActivityModal()}
                children={
                    <View style={styles.activityModalview}>

                        <View style={styles.boxSideSpace}>
                            <View style={styles.pinkSmallBox} >
                                <Image source={ImageName.WHITE_ACTIVITY_LOGO} style={styles.whiteActivityLogImg} />
                            </View>
                            <Text style={styles.textActivityLog}>Activity Log</Text>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                onPress={() => this.onOpenActivityModal()}
                                activeOpacity={0.9}>
                                <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.underline} />
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {this.state.activityLoader ?
                                <View style={styles.activityLoadSec}>
                                    <ActivityIndicator />
                                </View>
                                :
                                <View style={styles.modalMarginSec}>
                                    {this.state.activityDetails.map((item, key) => (
                                        <React.Fragment key={key}>
                                            <View style={{ marginTop: 15 }}>
                                                <View style={styles.itemDataSec}>
                                                    <View style={{ marginHorizontal: '5%' }}>
                                                        <View style={styles.textSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Image source={ImageName.BALCK_GRAY_CALENDER} style={styles.greyCalImg} />
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.dateText}>{DateConvert.viewDateFormat(item.time)}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.textSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Update By:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.userfirstname + " " + item.userlastname}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.textSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Action:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.activityname}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.textSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.priceText}>Company Name:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.priceValueText}>{item.primarykeyvalue}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.textSec}>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.sgstText}>Role Name:</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                <Text style={styles.fridgeTotalValueText}>{item.rolename}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.textSec}>
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
                                {this.VendorDetails()}
                                <View style={styles.activityLogTab}>
                                    <Text style={styles.activityLogTxt}>Activity Log</Text>
                                    <TouchableOpacity style={styles.activityLogBox} onPress={() => this.onOpenActivityModal()} activeOpacity={0.9}>
                                        <Text style={styles.textActivityLog}>Activity Log</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state.status == 4 ?
                                    null :
                                    <>
                                        {this.bidderListData()}
                                    </>
                                }
                                <View style={{ marginHorizontal: 600 }} />

                            </ScrollView>
                        </View>
                    </>
                }
                {this.activityLogModal()}
                {this.modalSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuctioneerListDetails);
