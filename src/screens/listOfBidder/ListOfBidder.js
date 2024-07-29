import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, RefreshControl, ActivityIndicator, ScrollView } from 'react-native'
import React, { Component } from 'react'
import styles from './Style';
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DateConvert, storageDataModification } from '../../services/common-view-function';
import { Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { BigTextButton, DropdownInputBox, Loader, Modal, NoDataFound, TextInputBox } from '../../shared';
import Header from '../header';
import { modifyBidderList, modifyProductDetails, modifySelectionCodeList } from './Function';
import { CustomStyle } from '../style';
import socketServices from '../../services/api/models/socketService';
import { CryptoDecoder } from '../../services/auth';

// this is list of bidder page 
class ListOfBidder extends Component {
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
            openProductModal: false,
            firstDate: "",
            lastDate: "",
            userData: {},
            productModalDataArr: [],
            productDetailsArr: [],
            selectionModal: false,
            selectionCommentText: "",
            selectionCommentActive: false,

            selectionCodeData: [],
            selectionCodeSelectObj: {},
            status: this.props.route.params.status,
            approveRoleId: "",
            vendorId: {},
            vendorAllId: [],
            vendorDetails: [],

            liveDetailsShowHide: false,
            modalCheckLoader: false


        }
    }

    // this is initial function which is call first 
    componentDidMount() {
        // socketServices.initializeSocket();
        this._load();
        this.socketConnection();
    }

    // for Socket Connection this function used
    socketConnection = async () => {
        let userData = await storageDataModification.userCredential({}, "get")

        socketServices.emit("joinroom", { "roleid": userData.roleId });
        socketServices.emit("specificAuctionRoom", { "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid });
        socketServices.on('aution_bid_response', (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.message === 'delete_auction_bid') {
                this.onRefresh();
            } else if (data.message === 'select_vendor' || data.message === '‘select_vendor_close’') {
                this.onRefresh();
            } else {
                this.onRefresh();
            }
        });
        socketServices.on('aution_bid_response_message', (data) => {
            data.response = CryptoDecoder.CryptoDecode(data.response);
            if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (data.message === 'delete_auction_bid') {
                    this.onRefresh();
                }
            }
        });
    }
    // this is first function where set state data 
    _load = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({
            userData: userData,
            // pageLoader: true,
        })
        this.getCurrentMonthFirstDateLastDate();
        await this._apiCallRes();
        await this._selectionDropDownApiRes()
        if (this.props.route.params.status == 5) {
            await this._approveData()
        }

    };

    // get all vendor id this function  used
    _getAllVendorId = (arrData) => {
        let subArr = []
        if (arrData) {
            for (let i = 0; i < arrData.length; i++) {
                let ids = arrData[i].id;
                subArr.push(ids);
            }
            this.state.vendorAllId = subArr
            this.setState({
                vendorAllId: this.state.vendorAllId
            })
        }
    }

    // 
    getCurrentMonthFirstDateLastDate = () => {
        let mainDate = DateConvert.getCurrentMonthFirstAndLastDate();
        this.state.firstDate = mainDate.firstDate;
        this.state.lastDate = mainDate.lastDate;
        this.setState({
            firstDate: this.state.firstDate,
            lastDate: this.state.lastDate
        })
    }

    // for back button press this function used
    _onBack = () => {
        this.props.navigation.goBack();
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // for list of bidder Api call this function used
    _apiCallRes = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        this.setState({ refreshing: false });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "clientid": userInfo.clientid,
            "auctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": this.state.userData.entitytypeid,
            "enttityid": this.state.userData.entityfieldmasterid,
            "userid": this.state.userData.id,
            "roleid": this.state.userData.roleId,
            "templateid": 1,
            "status": 6,
            "algorithmid": 1
        }
        let responseData = await MiddlewareCheck("bidderList", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let auctioneerLiveList = await modifyBidderList(responseData);
                this.setState({
                    upcomingAuctionList: [...this.state.upcomingAuctionList, ...auctioneerLiveList.bidderList],
                    totalDataCount: responseData.total
                })
                this._getAllVendorId(auctioneerLiveList.bidderList)
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    // for approve data this Api call
    _approveData = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
            "eventid": 2
        }
        let responseData = await MiddlewareCheck("getapprovallastrole", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.success) {
                let auctioneerLiveList = responseData.response;
                if (auctioneerLiveList == "") {
                    this.setState({
                        approveRoleId: auctioneerLiveList
                    })
                } else {
                    this.setState({
                        approveRoleId: auctioneerLiveList.roleid
                    })
                }

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }

    // for  approve dropdown data api
    _selectionDropDownApiRes = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            "clientid": userInfo.clientid,
        }
        let responseData = await MiddlewareCheck("selectionDropDownlist", dataReq, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let selectionDropDownList = await modifySelectionCodeList(responseData.response);
                this.setState({
                    selectionCodeData: selectionDropDownList,
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }

    // for select dropdown  this funcion used
    _onSelectionCodeSelect = (value) => {
        this.setState({ selectionCodeSelectObj: value });
    }

    // for on Textchange this function used 
    _onChangeComment = (value) => {
        this.setState({
            selectionCommentText: value
        })
    }
    // 
    _openProductDetails = async (item) => {
        await this.getProductDetails(item);
        this.showHideProductDetails();
    }

    // for show hide Product details this function used
    showHideProductDetails = () => {
        if (this.state.openProductModal == false) {
            this.state.openProductModal = true;
            this.setState({ openProductModal: this.state.openProductModal })
        } else {
            this.state.openProductModal = false;
            this.setState({ openProductModal: this.state.openProductModal })

        }
    }

    // for close product Modal this function used
    closeProductModal = () => {
        this.setState({ openProductModal: false, productDetailsArr: [] })
    }
    // for fetching product details data 
    getProductDetails = async (item) => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "masterauctionid": this.props.route.params.data.auctionfieldsvalueheaderid,
            "entitytypeid": 4,
            "enttityid": item.id,
            "templateid": 1,
            "userid": this.state.userData.id
        }
        let responseData = await MiddlewareCheck("getVendorProductDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let productDetailsData = await modifyProductDetails(responseData);
                this.setState({
                    productDetailsArr: [...this.state.productDetailsArr, ...productDetailsData.productdetails],
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }

    }
    // on selection this function used 
    _onAcceptModal = async () => {
        let today = Date.parse(new Date())
        // if (this.state.selectionCodeSelectObj.id == null || this.state.selectionCodeSelectObj.id == undefined) {
        //     Toaster.ShortCenterToaster("Please Select Selection Code")
        // } else 
        if (this.state.selectionCommentText == null || this.state.selectionCommentText == "" || this.state.selectionCommentText == undefined) {
            Toaster.ShortCenterToaster("Please Enter Your Comment")
        } else {
            this.setState({ modalCheckLoader: true })
            let userInfo = await storageDataModification.userCredential({}, "get");
            let reqData = {
                "clientid": userInfo.clientid,
                "userid": this.state.userData.id,
                "entitytypeid": this.state.userData.entitytypeid,
                "enttityid": this.state.userData.entityfieldmasterid,
                "roleid": this.state.userData.roleId,
                "templateid": 1,
                "auctionfieldsvalueheaderid": this.props.route.params.data.auctionfieldsvalueheaderid,
                "accepptedcommrnt": this.state.selectionCommentText,
                "vendor": this.state.vendorAllId,
                "selectedvendor": this.state.vendorId.id,
                "closercode": this.state.selectionCodeSelectObj.name == undefined || this.state.selectionCodeSelectObj.name == null ? "Selected on the Basis of Pricing" : this.state.selectionCodeSelectObj.name,
                "closeid": this.state.selectionCodeSelectObj.id == undefined || this.state.selectionCodeSelectObj.id == null ? "1" : this.state.selectionCodeSelectObj.id.toString(),
                "today": today
            }
            if (this.state.approveRoleId == "" || this.state.approveRoleId == this.state.userData.roleId) {
                this.setState({ modalCheckLoader: true })
                socketServices.emit("select_vendor_close", reqData);
                socketServices.on('aution_bid_response', (data) => {
                    data.response = CryptoDecoder.CryptoDecode(data.response);
                    if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.clearData()
                        this.props.navigation.navigate("AuctioneerOpenListPage")
                        this.props.route.params.onReloadData()
                        this.state.selectionModal = false;

                    } else {
                        Toaster.ShortCenterToaster(data.message)
                    }
                });
                socketServices.on('aution_bid_response_message', (data) => {
                    data.response = CryptoDecoder.CryptoDecode(data.response);
                    if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(data.message)
                    } else {
                    }
                });
                this.setState({ modalCheckLoader: false })
            } else {
                this.setState({ modalCheckLoader: true })
                socketServices.emit("select_vendor", reqData);
                socketServices.on('aution_bid_response', (data) => {
                    data.response = CryptoDecoder.CryptoDecode(data.response);
                    if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.clearData()
                        this.props.navigation.navigate("AuctioneerOpenListPage")
                        this.props.route.params.onReloadData()
                        this.state.selectionModal = false;

                    } else {
                        Toaster.ShortCenterToaster(data.message)
                    }
                });
                socketServices.on('aution_bid_response_message', (data) => {
                    data.response = CryptoDecoder.CryptoDecode(data.response);
                    if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        Toaster.ShortCenterToaster(data.message)
                    } else {
                    }
                });
                this.setState({ modalCheckLoader: false })
            }
        }
    }


    clearData = () => {
        this.state.selectionCodeSelectObj = {},
            this.state.selectionCommentText = "",
            this.setState({
                selectionCommentText: this.state.selectionCommentText,
                selectionCodeSelectObj: this.state.selectionCodeSelectObj
            })
    }

    getProductField = async (item) => {
    }

    _onSelectionModal = (item) => {
        this.state.vendorId = item
        this.setState({
            selectionModal: !this.state.selectionModal,
            vendorId: this.state.vendorId
        })
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
                <View style={{ flex: 1, marginHorizontal: '1%' }}>
                    {this.dataList(item.item, item.index)}
                </View>
            </View>
        );
    };
    // for render list data 
    dataList = (item, key) => {
        return <View style={styles.contactInfo}>{this.ListData(item, key)}</View>;
    };
    // for design circle logo 
    circelLogo = (item) => {
        return (
            <>
                <View style={styles.twelvePointBurst}>
                    <View style={styles.twelvePointBurstMain} />
                    <View style={styles.twelvePointBurst30} />
                    <View style={styles.twelvePointBurst60} >
                        <Text style={styles.itemRank}>{item.rank}</Text>
                    </View>
                </View>
            </>

        );
    };
    // for design list data 
    ListData = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ marginTop: 25 }} >
                    {/* {item.rank == 1 ? */}
                    <View style={item.rank == 1 ? styles.positionBox : styles.whiteBox} >
                        <View style={styles.listSec} >
                            <View style={item.rank == 1 ? styles.lightYellowCircel : styles.grayCircel}>
                                {item.rank == 1 ?
                                    <>
                                        {this.circelLogo(item)}
                                    </>
                                    :
                                    <Text style={styles.circelText}>{item.rank}</Text>
                                }
                            </View>
                            <TouchableOpacity style={styles.topBidderTab} activeOpacity={0.9} onPress={() => this._openProductDetails(item)}>
                                {item.rank == 1 ?
                                    <Text style={styles.boxHeaderText}>Top Bidder</Text>
                                    :
                                    null
                                }
                                <Text style={item.rank == 1 ? styles.positionValueText : styles.vendorNameText}>{item.vendorName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 0.2, }} activeOpacity={0.9} onPress={() => this._openProductDetails(item)}>
                                <Text style={styles.boxHeaderText}>Price</Text>
                                <Text style={item.rank == 1 ? styles.positionValueText : styles.vendorNameText}>{"\u20B9" + " " + item.price}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 0.2 }}>
                                <Text style={styles.boxHeaderText}>Total</Text>
                                <Text style={item.rank == 1 ? styles.positionValueText : styles.vendorNameText}>{"\u20B9" + " " + item.sumOfAmount}</Text>
                            </View>
                            {this.state.status == 5 ?
                                <TouchableOpacity onPress={() => this._onSelectionModal(item)}>
                                    <View style={styles.violetImgSec}>
                                        <Image source={ImageName.VIOLET_TICK_LOGO} style={styles.violetImg} />
                                    </View>
                                </TouchableOpacity> :
                                null
                            }
                        </View>
                    </View>
                </View>
            </React.Fragment >
        )
    };
    // for design list header section 
    listHeaderSection = () => {
        return (
            <View style={{}}>
                <TouchableOpacity onPress={() => this._onBack()}
                >
                    <Image source={ImageName.BACK_LOGO} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
            </View>
        )
    }
    // for design bidder header 
    bidderHeader = () => {
        return (
            <View style={styles.bidderMainBox}>
                <View style={styles.bidderSubBox}>
                    <View style={styles.listBidderSec}>
                        <View>
                            <Text style={styles.bidderText}>List of Bidder</Text>
                        </View>
                        <View style={styles.flexRowView}>
                            <Text style={styles.totalText}>Total</Text>
                            <View style={{ marginLeft: '5%' }}>
                                <View style={styles.violetCircel}>
                                    <Text style={styles.violetCircelNumberText}>{this.state.totalDataCount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.detailsText}>Detail View</Text>
                            <View style={{ width: 15 }} />
                            <Image source={ImageName.DROP_DOWN_UP_ARROW} style={styles.dropDownLogo} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    // for render product details data 
    renderProductDetails = (item) => {
        return (
            <>
                {this.listProductData(item.item, item.index)}
            </>
        )
    }
    // for design list product data 
    listProductData = (item, key) => {
        return (
            <React.Fragment key={item.id}>
                <View style={styles.modalview}>
                    <View style={styles.boxSideSpace}>
                        <Text style={styles.productUnitText}>Product Name/Item</Text>
                        <Text style={styles.valueText}>{item.productdesc}</Text>
                    </View>
                    <View style={styles.productItem}>
                        <View style={styles.productFirstItem}>
                        </View>
                        <View style={styles.productSecondItem}>
                            <Text style={styles.valueText}>Delivery Date</Text>
                            <Text style={styles.productUnitText}>{item.auctionDeliveryDate}</Text>
                        </View>
                    </View>
                    <View style={styles.productItem}>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>Product Unit</Text>
                            <Text style={styles.productUnitText}>{item.unitdesc}</Text>
                        </View>
                        <View style={styles.productSecondItem}>
                            <Text style={styles.valueText}>Quantity Required</Text>
                            <Text style={styles.productUnitText}>{item.requiredQty}</Text>
                        </View>
                    </View>
                    <View style={styles.productItem}>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>Base Price</Text>
                            <Text style={styles.productUnitText}>{item.basePrice}</Text>
                        </View>
                        <View style={styles.productSecondItem}>
                            <Text style={styles.valueText}>Available Quantity</Text>
                            <Text style={styles.productUnitText}>{item.availableQty}</Text>
                        </View>
                    </View>
                    <View style={styles.productItem}>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>Price</Text>
                            <Text style={styles.productUnitText}>{'\u20B9' + " " + item.price} </Text>
                        </View>
                        <View style={styles.productSecondItem}>
                            <Text style={styles.valueText}>Freight Cost</Text>
                            <Text style={styles.productUnitText}>{item.frieght.length == 0 ? "" : '\u20B9' + " " + item.frieght}</Text>
                        </View>
                    </View>
                    <View style={styles.productItem}>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>CGST</Text>
                            <Text style={styles.productUnitGstText}>{item.cgst + "%"}</Text>
                        </View>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>SGST</Text>
                            <Text style={styles.productUnitGstText}>{item.sgst + "%"}</Text>
                        </View>
                        <View style={styles.productFirstItem}>
                            <Text style={styles.valueText}>IGST</Text>
                            <Text style={styles.productUnitGstText}>{item.igst}</Text>
                        </View>
                        <View style={styles.totalAmntSec}>
                            <Text style={styles.valueText}>Total Amount</Text>
                            <Text style={styles.productUnitText}>{'\u20B9' + " " + item.subAmount}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }} />
            </React.Fragment>
        )
    }

    // for design modal section 
    modalSection = () => {
        return (
            <React.Fragment>
                <Modal isVisible={this.state.openProductModal}
                    onClose={() => this.closeProductModal()}
                    onBackdropPress={() => this.closeProductModal()}
                    children={
                        <View style={{ width: "100%" }}>
                            <React.Fragment>
                                <FlatList
                                    data={this.state.productDetailsArr}
                                    renderItem={(item) => this.renderProductDetails(item)}
                                    keyExtractor={item => item.id}
                                    // onEndReached={this.fetchMore}
                                    // onEndReachedThreshold={0.1}
                                    // ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={this.state.refreshing}
                                //         onRefresh={() => this.onRefresh()}
                                //     />
                                // }
                                />

                            </React.Fragment>
                        </View>
                    }
                />

            </React.Fragment>
        )
    }
    // for design selection modal section 
    selectionModal = () => {
        return (
            <>
                <Modal isVisible={this.state.selectionModal}
                    // onBackdropPress={() => this.onOpenModal()}
                    onBackButtonPress={() => this._onSelectionModal()}
                    children={
                        <View style={styles.selectionModalview}>
                            <View style={styles.selectionBoxSideSpace}>
                                <Text style={styles.textActivityLog}>{"Successful"}</Text>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }}
                                    onPress={() => this._onSelectionModal()}
                                    activeOpacity={0.9}>
                                    <Image source={ImageName.AUCTION_CROSS_IMG} style={styles.auctionCrossImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.selectionUnderline} />
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                                <View style={styles.modalMarginSec}>
                                    <Text style={styles.thankYouTxt}>{"Thank you for selecting the successful bidder. It is assumed that all due procedures are followed to select the bidder for this Auction. Please note that with the selection, the auction would be closed. Please select a proper closure code and submit a comment."}</Text>
                                    <Text style={styles.selectionTxt}>{"Selection Code"}</Text>
                                    <View style={{ marginTop: 20 }}>
                                        <DropdownInputBox
                                            selectedValue={this.state.selectionCodeSelectObj.id ? this.state.selectionCodeSelectObj.id.toString() : "1"}
                                            data={this.state.selectionCodeData}
                                            onSelect={(value) => this._onSelectionCodeSelect(value)}
                                            headerText={"Selection Code"}


                                        />
                                    </View>
                                    <Text style={styles.commentTxt}>{"Comment"}</Text>
                                    <View style={{ marginTop: 20 }}>
                                        <TextInputBox
                                            placeholder={"Your Comment"}
                                            height={80}
                                            value={this.state.selectionCommentText}
                                            onChangeText={(value) => this._onChangeComment(value)}
                                            keyboardType={"default"}
                                            isActive={this.state.selectionCommentActive}
                                            borderRadius={14}
                                            alignItems={"flex-start"}
                                            multiline={true}
                                            onFocus={() => { this.setState({ selectionCommentActive: true }) }}
                                            onBlur={() => { this.setState({ selectionCommentActive: false }) }}
                                        />
                                    </View>
                                    <View style={styles.bigBtnSec}>
                                        {this.state.modalCheckLoader == true ?
                                            <>
                                                <View style={styles.activityMainSec}>
                                                    <View style={styles.activitySubSec}>
                                                        < ActivityIndicator size="large" color="#7E47F3" />
                                                    </View>
                                                </View>
                                                <View style={{ marginBottom: '35%' }} />
                                            </> :
                                            <>
                                                {this.state.approveRoleId == "" || this.state.approveRoleId == this.state.userData.roleId ?

                                                    <>
                                                        <BigTextButton
                                                            height={35}
                                                            borderRadius={8}
                                                            backgroundColor={"#EBEBEB"}
                                                            text={"Cancel"}
                                                            fontColor={"#2C3338"}
                                                            onPress={() => this._onSelectionModal()}
                                                        />
                                                        <View style={{ width: 15 }} />
                                                        <BigTextButton
                                                            height={35}
                                                            borderRadius={8}
                                                            backgroundColor={"#7E47F3"}
                                                            text={"Accept & Close"}
                                                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                            onPress={() => this._onAcceptModal()}
                                                        />
                                                    </> :
                                                    <>
                                                        <BigTextButton
                                                            height={35}
                                                            borderRadius={8}
                                                            backgroundColor={"#EBEBEB"}
                                                            text={"Cancel"}
                                                            fontColor={"#2C3338"}
                                                            onPress={() => this._onSelectionModal()}
                                                        />
                                                        <View style={{ width: 15 }} />
                                                        <BigTextButton
                                                            height={35}
                                                            borderRadius={8}
                                                            backgroundColor={"#7E47F3"}
                                                            text={"Accept"}
                                                            fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                                            onPress={() => this._onAcceptModal()}
                                                        />
                                                    </>

                                                }
                                            </>

                                        }

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
                            {this.bidderHeader()}
                            {this.state.upcomingAuctionList.length > 0 ? (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.upcomingAuctionList}
                                        renderItem={(item) => this.renderContactList(item)}
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
                {this.modalSection()}
                {this.selectionModal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOfBidder);
