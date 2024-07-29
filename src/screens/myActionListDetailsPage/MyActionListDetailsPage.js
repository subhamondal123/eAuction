import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import styles from "./Style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../redux/SRMBAuctionAction";
import { MiddlewareCheck } from "../../services/middleware";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  DateConvert,
  storageDataModification,
} from "../../services/common-view-function";
import { Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { BigTextButton, Loader, Modal, TextInputBox } from "../../shared";
import Header from "../header";
import {
  modifyAuctioneerLiveListDetails,
  modifyCategoryDetails,
  modifyProductDetails,
  modifySelectionVendorDetails,
  modifyTearmsConditionDetails,
  modifyVendorDetails,
  modifyVendorListDetails,
} from "./Function";
import RenderHTML from "react-native-render-html";
import { DataValidator } from "../../validators";
import socketServices from "../../services/api/models/socketService";
import { CryptoDecoder } from "../../services/auth";

const mixedStyle = {
  body: {
    whiteSpace: "normal",
    color: "#aaa",
  },
  p: {
    color: "#828282",
  },
  h4: {
    color: "#000000",
  },
  ul: {
    color: "#828282",
  },
  li: {
    color: "#828282",
  },
};

class MyActionListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoader: true,
      liveDetailsShowHide: false,
      vendorShowHide: false,
      auctionDetails: {},
      productDetails: [],
      vendorDetails: [],
      tearmsConditionModal: false,
      categoryDetails: {},
      userData: this.props.route.params.data,
      tearmsDetails: "",
      status: this.props.route.params.status,
      productDetailsShowHide: false,
      approveRejectModal: false,
      approveText: "",
      commentActive: false,
      modaType: "",
      selectionVendor: {},
      productDetailsObj: {},
      modalCheckLoader: false,
    };
  }
  //this is initial function which is call first
  componentDidMount() {
    // socketServices.initializeSocket();
    this._load();
    this.socketConnection();
  }
  // for Socket connection this function used
  socketConnection = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    socketServices.emit("joinroom", { roleid: userData.roleId });
    socketServices.emit("specificAuctionRoom", {
      auctionid: this.state.userData.auctionfieldsvalueheaderid,
    });
  };
  // this is first function where set state data
  _load = async () => {
    await this._apiCallRes();
    await this._productDetailsApiCall();
    await this._vendorDetailsApiCall();
    await this._categoryApiRes();
    await this._tearmsConditionApiRes();
    if (this.state.userData.eventname == "Selection") {
      await this._selectedVendorDetailsApiRes();
      await this.getVendorProductDetails();
    }
    this.setState({
      pageLoader: false,
    });
  };

  // for Back Button press
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  // for Action details Api call
  _apiCallRes = async () => {
    let userInfo = await storageDataModification.userCredential({}, "get");
    let dataReq = {
      clientid: userInfo.clientid,
      templateid: 1,
      masterauctionid: this.state.userData.auctionfieldsvalueheaderid,
    };
    let responseData = await MiddlewareCheck(
      "auctiondetails",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let auctioneerLiveListDetails = await modifyAuctioneerLiveListDetails(
          responseData
        );
        this.setState({
          auctionDetails: auctioneerLiveListDetails.auctioneerLiveList[0],
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for Product Details Api call
  _productDetailsApiCall = async () => {
    let userCredential = await storageDataModification.userCredential(
      {},
      "get"
    );
    let dataReq = {
      clientid: userCredential.clientid,
      masterauctionid: this.state.userData.auctionfieldsvalueheaderid,
      entitytypeid: userCredential.entitytypeid,
    };

    let responseData = await MiddlewareCheck(
      "getproductdetails",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let productDetails = await modifyProductDetails(responseData);
        this.setState({
          productDetails: productDetails.productDetails,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for Vendor Api call
  _vendorDetailsApiCall = async () => {
    let userInfo = await storageDataModification.userCredential({}, "get");
    let dataReq = {
      clientid: userInfo.clientid,
      masterauctionid: this.state.userData.auctionfieldsvalueheaderid,
    };
    let responseData = await MiddlewareCheck(
      "vendordetails",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let vendorDetails = await modifyVendorDetails(responseData);
        this.setState({
          vendorDetails: vendorDetails.vendorListDetails,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for Category Api Call
  _categoryApiRes = async () => {
    let userInfo = await storageDataModification.userCredential({}, "get");
    let dataReq = {
      clientid: userInfo.clientid,
      masterauctionid: this.state.userData.auctionfieldsvalueheaderid,
    };
    let responseData = await MiddlewareCheck(
      "getauctioncategory",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let categoryDetails = await modifyCategoryDetails(responseData);
        this.setState({
          categoryDetails: categoryDetails.categoryDetails[0],
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for Tearms & Condition Api Call
  _tearmsConditionApiRes = async () => {
    let userInfo = await storageDataModification.userCredential({}, "get");
    let dataReq = {
      clientid: userInfo.clientid,
      templateid: 1,
      categoryid: this.state.categoryDetails.catevalid,
    };
    let responseData = await MiddlewareCheck(
      "tearmsConditionApi",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let tearmsConditionData = await modifyTearmsConditionDetails(
          responseData
        );
        this.setState({
          tearmsDetails: tearmsConditionData.fieldvalue,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for select Vendor Details Api call
  _selectedVendorDetailsApiRes = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    let dataReq = {
      clientid: userData.clientid,
      auctionfieldsvalueheaderid:
        this.state.userData.auctionfieldsvalueheaderid,
      entitytypeid: userData.entitytypeid,
      enttityid: userData.entityfieldmasterid,
      templateid: 1,
    };
    let responseData = await MiddlewareCheck(
      "selctedVendorDetails",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let selectedVendorData = await modifyVendorListDetails(responseData);
        this.setState({
          selectionVendor: selectedVendorData.vendorData[0],
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for vendor Details Api call
  getVendorProductDetails = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    let reqData = {
      clientid: userData.clientid,
      masterauctionid: this.state.userData.auctionfieldsvalueheaderid,
      entitytypeid: 4,
      enttityid: this.state.selectionVendor.entityfieldmasterid,
      templateid: 1,
      userid: userData.id,
    };
    let responseData = await MiddlewareCheck(
      "getVendorProductDetails",
      reqData,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let productDetailsData = await modifySelectionVendorDetails(
          responseData
        );
        this.setState({
          productDetailsObj: productDetailsData.selectionProductdetails[0],
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for Approve Button Api
  _onApproveSaveModal = async () => {
    let userData = await storageDataModification.userCredential({}, "get");
    if (this.state.modaType == "approve") {
      if (
        this.state.approveText == undefined ||
        this.state.approveText.length == 0
      ) {
        Toaster.ShortCenterToaster("Please Enter Your Approval Comment");
      } else {
        let reqData = {
          clientid: userData.clientid,
          userid: userData.id,
          entitytypeid: userData.entitytypeid,
          enttityid: userData.entityfieldmasterid,
          roleid: userData.roleId,
          templateid: 1,
          auctionfieldsvalueheaderid:
            this.state.userData.auctionfieldsvalueheaderid,
          level: this.state.userData.level,
          mapapprovaleventid: this.state.userData.maptemplateeventlevelroleid,
          approvalcomment: this.state.approveText,
          eventid: this.state.userData.eventid,
          vendor: this.state.vendorDetails,
        };
        this.setState({ modalCheckLoader: true });
        socketServices.emit("approval_creation", reqData);
        socketServices.on("approval_creation_response", (data) => {
          data.response = CryptoDecoder.CryptoDecode(data.response);
          if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.approveRejectModal = false;
            this.setState({
              approveRejectModal: this.state.approveRejectModal,
            });
            this.props.navigation.navigate("MyActionListPage");
            this.props.route.params.onReloadPage();
            this.clearData();
            Toaster.ShortCenterToaster(data.message);
          } else {
          }
          this.setState({ modalCheckLoader: false });
        });
        socketServices.on("aution_creation_response_for_bidder", (data) => {
          data.response = CryptoDecoder.CryptoDecode(data.response);
          if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            Toaster.ShortCenterToaster(data.message);
          } else {
          }
        });
      }
    } else {
      if (
        this.state.approveText == "" ||
        this.state.approveText == null ||
        this.state.approveText == undefined
      ) {
        Toaster.ShortCenterToaster("Please Enter Your Reject Comment");
      } else {
        let reqData = {
          clientid: userData.clientid,
          userid: userData.id,
          entitytypeid: userData.entitytypeid,
          enttityid: userData.entityfieldmasterid,
          roleid: userData.roleId,
          templateid: 1,
          auctionfieldsvalueheaderid:
            this.state.userData.auctionfieldsvalueheaderid,
          level: this.state.userData.level,
          mapapprovaleventid: this.state.userData.maptemplateeventlevelroleid,
          approvalcomment: this.state.approveText,
          eventid: this.state.userData.eventid,
          vendor: this.state.vendorDetails,
        };
        this.setState({ modalCheckLoader: true });
        socketServices.emit("reject_creation", reqData);
        socketServices.on("approval_creation_response", (data) => {
          data.response = CryptoDecoder.CryptoDecode(data.response);
          if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.state.approveRejectModal = false;
            this.setState({
              approveRejectModal: this.state.approveRejectModal,
            });
            this.props.navigation.navigate("MyActionListPage");
            this.props.route.params.onReloadPage();
            this.clearData();
            Toaster.ShortCenterToaster(data.message);
          } else {
          }
          this.setState({ modalCheckLoader: false });
        });
        socketServices.on("aution_bid_auctioneer_notification", (data) => {
          // if (data.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          //     Toaster.ShortCenterToaster(data.message)
          // } else {
          // }
        });
      }
    }
  };
  // for Clear Data
  clearData = () => {
    this.state.approveText = "";
    this.setState({
      approveText: this.state.approveText,
    });
  };

  // for TearmsCondition Modal Open Close
  onOpenModal = async () => {
    if (this.state.tearmsConditionModal == false) {
      this.setState({
        tearmsConditionModal: true,
      });
    } else {
      this.setState({
        tearmsConditionModal: false,
      });
    }
  };

  // for Vendor Details show Hide Data
  showHideVendorData = () => {
    this.setState({
      vendorShowHide: !this.state.vendorShowHide,
    });
  };

  // for Action details Show Hide
  _onShowHide = () => {
    this.setState({
      liveDetailsShowHide: !this.state.liveDetailsShowHide,
    });
  };

  // for Product Details show Hide
  _onProductDetailsShowHide = () => {
    this.setState({
      productDetailsShowHide: !this.state.productDetailsShowHide,
    });
  };

  // for Approve & Reject Modal Section open Close
  _onApproveRejectModal = async (type) => {
    this.setState({
      modaType: type,
    });
    if (this.state.approveRejectModal == false) {
      this.setState({
        approveRejectModal: true,
      });
    } else {
      this.setState({
        approveRejectModal: false,
      });
    }
    this.setState({
      modaType: type,
    });
    await this.clearData();
  };

  // for approve And Reject Text Change here
  _onChangeComment = (value) => {
    let newText = "";
    newText = DataValidator.inputEntryValidate(value, "name");
    this.setState({
      approveText: newText,
    });
  };

  // back Button Section here
  listHeaderSection = () => {
    return (
      <View style={{}}>
        <TouchableOpacity onPress={() => this._onBack()}>
          <Image source={ImageName.BACK_LOGO} style={styles.backImg} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    );
  };

  // for Auction Details Section
  ListDetails = () => {
    return (
      <>
        <View style={styles.mainBox}>
          <TouchableOpacity
            style={styles.subBox}
            activeOpacity={0.8}
            onPress={() => this._onShowHide()}
          >
            <View style={styles.BoxMarginSec}>
              <View style={styles.violetSmallBox}>
                <Text style={styles.numberText}>
                  {this.props.route.params.key}
                </Text>
              </View>
              <View style={styles.primeVluDateSec}>
                <View style={styles.columnSec}>
                  <Text style={styles.auctionText}>
                    {this.state.auctionDetails.primevalue}
                  </Text>
                </View>
                <View style={styles.startEndDate}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.valueText}>
                      {this.state.auctionDetails.startDate}
                    </Text>
                    <Text style={styles.productUnitText}>
                      {this.state.auctionDetails.endtime}
                    </Text>
                  </View>
                </View>
                <Image
                  source={
                    this.state.liveDetailsShowHide == true
                      ? ImageName.DROP_DOWN_UP_ARROW
                      : ImageName.VIOLET_DOWN_LOGO
                  }
                  style={styles.violetDropDownLogo}
                />
              </View>
            </View>
          </TouchableOpacity>
          {this.state.liveDetailsShowHide ? (
            <View>
              <View style={{ backgroundColor: "#EBEBEB" }}>
                <View style={{ marginHorizontal: "3%" }}>
                  <View style={styles.item}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>Auction Type</Text>
                      <Text style={styles.valueText}>
                        {this.state.categoryDetails.auctionval}
                      </Text>
                    </View>
                    <View style={styles.secondItem}>
                      <Text style={styles.productUnitText}>
                        Auction Category
                      </Text>
                      <Text style={styles.valueText}>
                        {this.state.categoryDetails.cateval}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>Auction Start</Text>
                      <Text style={styles.valueText}>
                        {this.state.auctionDetails.startDate}
                      </Text>
                      <Text style={styles.valueText}>
                        {this.state.auctionDetails.startTime}
                      </Text>
                    </View>
                    <View style={styles.secondItem}>
                      <Text style={styles.productUnitText}>Auction End</Text>
                      <Text style={styles.valueText}>
                        {this.state.auctionDetails.endDate}
                      </Text>
                      <Text style={styles.valueText}>
                        {this.state.auctionDetails.endtime}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.descItem}>
                    <Text style={styles.valueText}>Auction Describtion</Text>
                    <Text style={styles.productUnitText}>
                      {this.state.auctionDetails.auctionDes}
                    </Text>
                  </View>
                  <View style={styles.descItem}>
                    <Text style={styles.valueText}>Delivery Instruction</Text>
                    <Text style={styles.productUnitText}>
                      {this.state.auctionDetails.deliveryIns}
                    </Text>
                  </View>
                </View>
                <View style={{ marginBottom: 12 }} />
              </View>
              <View style={{ marginBottom: 30 }} />
            </View>
          ) : null}
        </View>
      </>
    );
  };

  // for product Details Section
  productDetails = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.bidderMainBox}
          onPress={() => this._onProductDetailsShowHide()}
          activeOpacity={0.9}
        >
          <View style={styles.bidderSubBox}>
            <View style={styles.listBidderSec}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bidderText}>Product Details</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.detailsText}>Detail View</Text>
                <View style={{ width: 15 }} />
                <Image
                  source={
                    this.state.productDetailsShowHide == true
                      ? ImageName.DROP_DOWN_UP_ARROW
                      : ImageName.VIOLET_DOWN_LOGO
                  }
                  style={styles.dropDownLogo}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.productDetailsShowHide == true ? (
          <View style={{ backgroundColor: "#f5f5f5" }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.state.productDetails.map((item, key) => (
                <View style={{ marginHorizontal: "3%" }} key={key}>
                  <View style={{ marginTop: 5 }} />
                  <View style={styles.boxStyle} />
                  <View style={styles.productItem}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>Product/Item</Text>
                      <Text style={styles.valueText}>{item.productdesc}</Text>
                    </View>
                    <View style={styles.secondItem}>
                      <Text style={styles.productUnitText}>GST(%)</Text>
                      <Text style={styles.valueText}>{item.gst}</Text>
                    </View>
                  </View>
                  <View style={styles.productItem}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>Product Unit</Text>
                      <Text style={styles.valueText}>{item.unitdesc}</Text>
                    </View>
                    <View style={styles.secondItem}>
                      <Text style={styles.productUnitText}>
                        Product Quantity
                      </Text>
                      <Text style={styles.valueText}>{item.quantityReq}</Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>Base Price</Text>
                      <Text style={styles.valueText}>{item.basePrice}</Text>
                    </View>
                    <View style={styles.secondItem}>
                      <Text style={styles.productUnitText}>
                        Auction Tick Size(%)
                      </Text>
                      <Text style={styles.valueText}>
                        {item.auctionticksize == ""
                          ? "N/A"
                          : item.auctionticksize}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={styles.firstItem}>
                      <Text style={styles.productUnitText}>
                        Auction Delivery Date
                      </Text>
                      <Text style={styles.valueText}>
                        {DateConvert.viewDateFormat(item.deliveryDate)}
                      </Text>
                    </View>
                    <View style={styles.secondItem} />
                  </View>
                  <View style={styles.boxStyle} />
                  <View style={{ marginBottom: "5%" }} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.detailsTextSec}>
              <Text style={styles.readAllTxt}>
                Read all tearms & condition before perticipate in the auction
              </Text>
              <TouchableOpacity
                onPress={() => this.onOpenModal()}
                activeOpacity={0.9}
              >
                <Text style={styles.detailTxt}>Detail</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: "5%" }} />
          </View>
        ) : null}
      </>
    );
  };

  // for Selection Vendor Details here
  selectionVendorDetailsView = () => {
    return (
      <View style={{ backgroundColor: "#F5F5F5" }}>
        <View style={{ marginHorizontal: "3%" }}>
          <View style={styles.item}>
            <View style={styles.firstItem}>
              <Text style={styles.productUnitText}>Vendor Name</Text>
              <Text style={styles.valueText}>
                {this.state.selectionVendor.primarykeyvalue == " "
                  ? "N/A"
                  : this.state.selectionVendor.primarykeyvalue}
              </Text>
            </View>
            <View style={styles.secondItem}>
              <Text style={styles.productUnitText}>Product/Item</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.productdesc == " "
                  ? "N/A"
                  : this.state.productDetailsObj.productdesc}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.firstItem}>
              <Text style={styles.productUnitText}>Available Quantity</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.availableQty == " "
                  ? "N/A"
                  : this.state.productDetailsObj.availableQty}
              </Text>
            </View>
            <View style={styles.secondItem}>
              <Text style={styles.productUnitText}>Price</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.price == " "
                  ? "N/A"
                  : this.state.productDetailsObj.price}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.firstItem}>
              <Text style={styles.productUnitText}>Freight Cost</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.frieght == ""
                  ? "N/A"
                  : this.state.productDetailsObj.frieght}
              </Text>
            </View>
            <View style={styles.secondItem}>
              <Text style={styles.productUnitText}>CGST (%)</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.cgst == ""
                  ? "N/A"
                  : this.state.productDetailsObj.cgst}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.firstItem}>
              <Text style={styles.productUnitText}>SGST (%)</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.sgst == ""
                  ? "N/A"
                  : this.state.productDetailsObj.sgst}
              </Text>
            </View>
            <View style={styles.secondItem}>
              <Text style={styles.productUnitText}>IGST (%)</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.igst == ""
                  ? "N/A"
                  : this.state.productDetailsObj.igst}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.firstItem}>
              <Text style={styles.productUnitText}>Sub Total</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.subAmount == " "
                  ? "N/A"
                  : this.state.productDetailsObj.subAmount}
              </Text>
            </View>
            <View style={styles.secondItem}>
              <Text style={styles.productUnitText}>Total Amount</Text>
              <Text style={styles.valueText}>
                {this.state.productDetailsObj.totalAmount == " "
                  ? "N/A"
                  : this.state.productDetailsObj.totalAmount}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: "5%" }} />
        </View>
      </View>
    );
  };

  // for Vendor Details Section
  VendorDetails = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.bidderMainBox}
          onPress={() => this.showHideVendorData()}
          activeOpacity={0.9}
        >
          <View style={styles.bidderSubBox}>
            <View style={styles.listBidderSec}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bidderText}>Vendors</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.detailsText}>Detail View</Text>
                <View style={{ width: 15 }} />
                <Image
                  source={
                    this.state.vendorShowHide == true
                      ? ImageName.DROP_DOWN_UP_ARROW
                      : ImageName.VIOLET_DOWN_LOGO
                  }
                  style={styles.dropDownLogo}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.state.userData.eventname == "Creation" ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.vendorShowHide == true ? (
              <>
                <View style={styles.mapListSec}>
                  {this.state.vendorDetails.map((item, key) => (
                    <React.Fragment key={key}>
                      <View style={{ marginTop: 15 }}>
                        <View style={styles.whiteBox}>
                          <Text style={styles.keyValTxt}>
                            {item.index + 1 + ". " + item.primarykeyvalue}
                          </Text>
                        </View>
                      </View>
                      <View style={{ width: 8 }} />
                    </React.Fragment>
                  ))}
                </View>
              </>
            ) : null}
          </ScrollView>
        ) : (
          <>
            {this.state.vendorShowHide == true ? (
              <>{this.selectionVendorDetailsView()}</>
            ) : null}
          </>
        )}
      </>
    );
  };

  // for Approve And Reject button Section
  buttonView = () => {
    return (
      <View style={styles.btnSec}>
        <BigTextButton
          height={50}
          borderRadius={15}
          backgroundColor={"#EBEBEB"}
          text={"Reject"}
          fontColor={"#2C3338"}
          onPress={() => this._onApproveRejectModal("reject")}
        />
        <View style={{ width: 15 }} />
        <BigTextButton
          height={50}
          borderRadius={15}
          backgroundColor={"#7E47F3"}
          text={"Approve"}
          fontColor={Color.COLOR.WHITE.PURE_WHITE}
          onPress={() => this._onApproveRejectModal("approve")}
        />
      </View>
    );
  };

  // for Tearms And Condition Modal Section
  modalSection = () => {
    return (
      <>
        <Modal
          isVisible={this.state.tearmsConditionModal}
          // onBackdropPress={() => this.onOpenModal()}
          onBackButtonPress={() => this.onOpenModal()}
          children={
            <View style={styles.modalview}>
              <View style={styles.boxSideSpace}>
                <View style={styles.pinkSmallBox}>
                  <Image
                    source={ImageName.WHITE_ACTIVITY_LOGO}
                    style={styles.whiteActivityLogImg}
                  />
                </View>
                <Text style={styles.textActivityLog}>Terms & Condition</Text>
                <TouchableOpacity
                  style={{ alignItems: "flex-end" }}
                  onPress={() => this.onOpenModal()}
                  activeOpacity={0.9}
                >
                  <Image
                    source={ImageName.AUCTION_CROSS_IMG}
                    style={styles.auctionCrossImg}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.underline} />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
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
    );
  };

  // for Approve And Reject Modal Section
  approveRejectModal = () => {
    return (
      <Modal
        isVisible={this.state.approveRejectModal}
        // onBackdropPress={() => this.onOpenModal()}
        onBackButtonPress={() => this._onApproveRejectModal()}
        children={
          <View style={styles.modalview}>
            <View style={styles.boxSideSpace}>
              <View style={styles.pinkSmallBox}>
                <Image
                  source={ImageName.WHITE_ACTIVITY_LOGO}
                  style={styles.whiteActivityLogImg}
                />
              </View>
              <Text style={styles.textActivityLog}>
                {this.state.modaType == "approve"
                  ? "Add Approval Comment"
                  : "Add Reject Comment"}
              </Text>
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                onPress={() => this._onApproveRejectModal()}
                activeOpacity={0.9}
              >
                <Image
                  source={ImageName.AUCTION_CROSS_IMG}
                  style={styles.auctionCrossImg}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.underline} />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalMarginSec}>
                <Text
                  style={{
                    color: Color.COLOR.BLACK.PURE_BLACK,
                    fontSize: FontSize.SM,
                    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
                  }}
                >
                  {this.state.modaType == "approve"
                    ? "Approval Comment"
                    : "Reject Comment"}
                </Text>
                <View style={{ marginTop: 20 }}>
                  <TextInputBox
                    placeholder={"Enter Comment"}
                    height={80}
                    value={this.state.approveText}
                    onChangeText={(value) => this._onChangeComment(value)}
                    keyboardType={"default"}
                    isActive={this.state.commentActive}
                    borderRadius={14}
                    alignItems={"flex-start"}
                    multiline={true}
                    onFocus={() => {
                      this.setState({ commentActive: true });
                    }}
                    onBlur={() => {
                      this.setState({ commentActive: false });
                    }}
                  />
                </View>
                <></>

                <View style={styles.txtBtnLoadSec}>
                  {this.state.modalCheckLoader == true ? (
                    <>
                      <View style={styles.activityLoadSec}>
                        <View style={styles.activityLoadSubSec}>
                          <ActivityIndicator size="large" color="#7E47F3" />
                        </View>
                      </View>
                      <View style={{ marginBottom: "35%" }} />
                    </>
                  ) : (
                    <>
                      <BigTextButton
                        height={40}
                        borderRadius={8}
                        backgroundColor={"#EBEBEB"}
                        text={"Cancel"}
                        fontColor={"#2C3338"}
                        onPress={() => this._onApproveRejectModal()}
                      />
                      <View style={{ width: 15 }} />
                      {this.state.modaType == "approve" ? (
                        <BigTextButton
                          height={40}
                          borderRadius={8}
                          backgroundColor={"#7E47F3"}
                          text={"Save"}
                          fontColor={Color.COLOR.WHITE.PURE_WHITE}
                          onPress={() => this._onApproveSaveModal()}
                        />
                      ) : (
                        <BigTextButton
                          height={40}
                          borderRadius={8}
                          backgroundColor={"#7E47F3"}
                          text={"Reject"}
                          fontColor={Color.COLOR.WHITE.PURE_WHITE}
                          onPress={() => this._onApproveSaveModal()}
                        />
                      )}
                    </>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={{ marginBottom: 20 }} />
          </View>
        }
      />
    );
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header {...this.props} />
        {this.state.pageLoader ? (
          <Loader />
        ) : (
          <>
            <View style={styles.space}>
              {this.listHeaderSection()}
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {this.ListDetails()}
                {this.VendorDetails()}
                {this.productDetails()}
                {this.buttonView()}
                <View style={{ marginBottom: 200 }} />
              </ScrollView>
            </View>
          </>
        )}
        {this.modalSection()}
        {this.approveRejectModal()}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const { SRMBAuctionRedux } = state;
  return { SRMBAuctionRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
      stateUserInformation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyActionListDetails);
