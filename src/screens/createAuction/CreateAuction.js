import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import styles from "./Style";
import Header from "../header";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SearchableDropdownInputBox, TextInputBox } from "../../shared";
import { DateConvert, Toaster, storageDataModification } from "../../services/common-view-function";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { getAuctionData, getBidderPermData, modAuctionData, modAuctionFieldData, modBidderData, modProductData, modProductFieldData, modifyCategoryData, modifyProductData, modifyTearmsConditionDetails, modifyTypeData, modifyVendorData, setArrData, validateReqData } from "./Function";
import { DataValidator } from "../../validators";
import DatePicker from "react-native-date-picker";
import ToggleSwitch from "toggle-switch-react-native";
import _debounce from 'lodash/debounce';
import RenderHTML from "react-native-render-html";
import socketServices from "../../services/api/models/socketService";
import { getData } from "../../services/async-storage";


const { Component } = require("react");
const { SafeAreaView } = require("react-native-safe-area-context");

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

class CreateAuction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            ///auction creation
            selectedAuctionCategory: {},
            selectedAuctionType: {},
            selectedProduct: {},
            selectedProductIdArr: [],
            auctionCategoryArr: [],
            auctionTypeArr: [],
            productArr: [],
            userInfo: {},
            isDisableCategoryAndType: false,
            //selected products sec
            showHideProductSec: false,
            showHideVendorSec: false,
            selectedProductsArr: [],
            isVisibleDatePicker: false,
            //,,,,,,,,
            vendorArr: [],
            searchVendorTxt: "",
            selectAllVendors: false,
            selectedVendors: [],
            vendorLoader: false,
            selectedVendorObj: {},
            showHideAuctionDetailSec: false,
            auctionDetailsData: [],
            bidderPermDataArr: [],
            selectedBidderPermObj: {},
            tearmsDetails: "",
            showHideTermsCondition: false,
            termsConditionDataArr: []
        }
    }

    componentDidMount = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        this.setState({ userInfo: userData })
        await this.onLoad()
    }

    onLoad = async () => {
        await this.getAuctionCategory();
    }

    getAuctionCategory = async () => {
        let reqData = {
            "roleid": this.state.userInfo.roleId,
            "enttityid": this.state.userInfo.entityid
        }
        let responseData = await MiddlewareCheck("auctionCategoryList", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyCategoryData(responseData.response)
                this.setState({ auctionCategoryArr: modData })
            }
        }
    }


    getAuctionType = async (val) => {
        let reqData = {
            "catevalid": val,
        }
        let responseData = await MiddlewareCheck("auctionType", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyTypeData(responseData.response)
                this.setState({ auctionTypeArr: modData })
            }
        }
    }

    getProductType = async (val) => {
        let reqData = {
            "categoryval": this.state.selectedAuctionCategory.id,
            "auctionval": val,
            "product": ""
        }
        let responseData = await MiddlewareCheck("allProduct", reqData, this.props)


        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyProductData(responseData.response)
                this.setState({ productArr: modData })
            }
        }
    }

    getVendors = async (val) => {
        let reqData = {
            "categoryval": this.state.selectedAuctionCategory.id,
            "auctionval": val,
        }
        let responseData = await MiddlewareCheck("vendorsuggetion", reqData, this.props)
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyVendorData(responseData.response)
                this.setState({ vendorArr: modData })
            }
        }
    }


    _tearmsConditionApiRes = async () => {
        let dataReq = {
            "templateid": 1,
            "categoryid": 1
        }
        let responseData = await MiddlewareCheck("tearmsConditionApi", dataReq, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let tearmsConditionData = await modifyTearmsConditionDetails(responseData);
                this.setState({
                    tearmsDetails: tearmsConditionData.fieldvalue,
                    termsConditionDataArr: responseData.response
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    onSelectCategory = async (val) => {
        this.setState({
            selectedAuctionCategory: val
        })
        await this._tearmsConditionApiRes();
        await this.getAuctionType(val.id)
    }

    onSelectBidderPermission = async (val, item, index) => {
        let auctionDetails = this.state.auctionDetailsData;
        auctionDetails[index].fieldvalue = val.id;
        let auctionDetailsObj = { ...auctionDetails[index], predifinevalue: modBidderData(this.state.bidderPermDataArr) };
        auctionDetails[index] = auctionDetailsObj;
        this.setState({
            selectedBidderPermObj: val,
            auctionDetailsData: auctionDetails
        })
    }

    onSelectType = async (val) => {
        this.setState({
            selectedAuctionType: val
        })
        await this.getProductType(val.id)
        await this.getVendors(val.id)
    }

    onSelectProduct = async (val) => {
        this.setState({
            selectedProduct: val
        })
    }

    clearAuctionCreationData = () => {
        this.setState({
            selectedAuctionCategory: {},
            selectedAuctionType: {},
            selectedProduct: {},
            isDisableCategoryAndType: false,
            selectedProductsArr: [],
            selectedProductIdArr: [],
            vendorArr: []
        })
    }


    auctionCreationSec = () => {
        const onReset = () => {
            this.clearAuctionCreationData()
        }

        const onApply = async () => {
            let productItemArr = this.state.selectedProductsArr;
            let productIdArr = this.state.selectedProductIdArr;
            let productFieldData = [];
            let auctionFieldData = [];
            let auctionDetailsDataArr = []
            if (this.state.selectedAuctionCategory.id == undefined || this.state.selectedAuctionCategory.id == null) {
                Toaster.ShortCenterToaster("Please select Auction Category !")
            } else if (this.state.selectedAuctionType.id == undefined || this.state.selectedAuctionType.id == null) {
                Toaster.ShortCenterToaster("Please select Auction Type !")
            } else if (this.state.selectedProduct.id == undefined || this.state.selectedProduct.id == null) {
                Toaster.ShortCenterToaster("Please select Product/Item !")
            } else {
                if (this.state.selectedProductsArr.length > 0 && (this.state.selectedProductIdArr.includes(this.state.selectedProduct.id))) {
                    Toaster.ShortCenterToaster("A Product/Item with same details already exist !")
                } else {
                    let reqData = {
                        "productid": this.state.selectedProduct.id
                    }
                    let responseData = await MiddlewareCheck("getproductfield", reqData, this.props)
                    if (responseData) {
                        if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            productFieldData = modProductFieldData(responseData.response)
                        }
                    }
                    let auction_responseData = await MiddlewareCheck("getauctionfield", reqData, this.props)
                    if (auction_responseData) {
                        if (auction_responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            auctionFieldData = modAuctionFieldData(auction_responseData.response);
                            this.state.auctionDetailsData = getAuctionData(auction_responseData.response);
                        }
                    }
                    let bidder_perm_responseData = await MiddlewareCheck("getauctionheader", {}, this.props);
                    if (bidder_perm_responseData) {
                        if (bidder_perm_responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                            let bidderPermData = getBidderPermData(bidder_perm_responseData.response);
                            this.setState({ bidderPermDataArr: bidderPermData });
                        }
                    }
                    let arrData = setArrData(productFieldData, auctionFieldData, this.state)
                    productItemArr.push(arrData)
                    productIdArr.push(this.state.selectedProduct.id)
                    this.setState({ selectedProductsArr: productItemArr, selectedProductIdArr: productIdArr, showHideProductSec: true, isDisableCategoryAndType: true, auctionDetailsData: this.state.auctionDetailsData })

                }
            }
        }

        return (
            <View style={{ marginHorizontal: 15, paddingBottom: 20 }}>
                <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR, backgroundColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR }} />
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                    <Text style={styles.labelTxt}>Auction Creation</Text>
                </View>
                <View style={{ marginVertical: 8 }}>
                    <SearchableDropdownInputBox
                        selectedValue={this.state.selectedAuctionCategory.id ? this.state.selectedAuctionCategory.id.toString() : "0"}
                        data={this.state.auctionCategoryArr}
                        upDownImages={[ImageName.BLACK_UP_LOGO, ImageName.BLACK_DOWN_LOGO]}
                        onSelect={(value) => this.onSelectCategory(value)}
                        headerText={"Select Auction Category"}
                        selectedText={this.state.selectedAuctionCategory.name ? this.state.selectedAuctionCategory.name : "Select Auction Category"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        borderRadius={10}
                        fontSize={12}
                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                        // selectedTextColor={"#747C90"}
                        unSelectedTextColor={"#787878"}
                        // backgroundColor={"#F0F4F7"}
                        isSearchable={true}
                        isDisabled={this.state.isDisableCategoryAndType}
                    />
                </View>
                <View style={{ marginVertical: 8 }}>
                    <SearchableDropdownInputBox
                        selectedValue={this.state.selectedAuctionType.id ? this.state.selectedAuctionType.id.toString() : "0"}
                        data={this.state.auctionTypeArr}
                        upDownImages={[ImageName.BLACK_UP_LOGO, ImageName.BLACK_DOWN_LOGO]}
                        onSelect={(value) => this.onSelectType(value)}
                        headerText={"Select Auction Type"}
                        selectedText={this.state.selectedAuctionType.name ? this.state.selectedAuctionType.name : "Select Auction Category"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        borderRadius={10}
                        fontSize={12}
                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                        // selectedTextColor={"#747C90"}
                        unSelectedTextColor={"#787878"}
                        // backgroundColor={"#F0F4F7"}
                        isSearchable={true}
                        isDisabled={this.state.isDisableCategoryAndType}
                    />
                </View>
                <View style={{ marginVertical: 8 }}>
                    <SearchableDropdownInputBox
                        selectedValue={this.state.selectedProduct.id ? this.state.selectedProduct.id.toString() : ""}
                        data={this.state.productArr}
                        upDownImages={[ImageName.BLACK_UP_LOGO, ImageName.BLACK_DOWN_LOGO]}
                        onSelect={(value) => this.onSelectProduct(value)}
                        headerText={"Select Product/Item"}
                        selectedText={this.state.selectedAuctionCategory.name ? this.state.selectedAuctionCategory.name : "Select Auction Category"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        borderRadius={10}
                        fontSize={12}
                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                        // selectedTextColor={"#747C90"}
                        unSelectedTextColor={"#787878"}
                        isSearchable={true}
                    // backgroundColor={"#F0F4F7"}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity onPress={() => onReset()} style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.COLOR.GRAY.CORDUROY, backgroundColor: "#EBEBEB", paddingHorizontal: 50, paddingVertical: 14 }}>
                        <Text style={{ color: "#2C3338", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Reset</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => onApply()} style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.COLOR.GRAY.CORDUROY, backgroundColor: Color.COLOR.VIOLET.LAVENDER_INDIGO, paddingHorizontal: 50, paddingVertical: 14 }}>
                        <Text style={{ color: "#fff", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    OnDatePickerView = (type, item, index, item1, index1) => {
        let arrData = this.state.selectedProductsArr;
        arrData[index].respArrData[index1].visibleDatePicker = type
        this.setState({ selectedProductsArr: arrData })
    }


    selectedProductArrSec = () => {
        const showHideField = () => {
            this.setState({ showHideProductSec: !this.state.showHideProductSec })
        }
        const onShowHideItem = (index) => {
            let arrData = this.state.selectedProductsArr
            arrData[index].isShowHide = !arrData[index].isShowHide
            this.setState({ selectedProductsArr: arrData })
        }
        const onDeleteItem = (item, index) => {
            let arrData = this.state.selectedProductsArr
            arrData.splice(index, 1)
            this.setState({ selectedProductsArr: arrData })
            if (arrData.length == 0) {
                this.setState({ isDisableCategoryAndType: false })
            }
            removeSelectedProductId(item)
        }
        ///to remove the selected product ids
        const removeSelectedProductId = (item) => {
            let productIdArr = this.state.selectedProductIdArr
            for (let i = 0; i < productIdArr.length; i++) {
                if (productIdArr[i] == item.productDesc.productid) {
                    productIdArr.splice(i, 1)
                }
            }
            this.setState({ selectedProductIdArr: productIdArr })
        }

        const onChangeText = (val, item, index, item1, index1) => {
            let p = val.replace(/[.,\-\s]/g, '');
            let arrData = this.state.selectedProductsArr
            if (item1.fieldlabeldesc == "Auction Delivery Date") {
                // OnDatePickerView(true)
            } else {
                arrData[index].respArrData[index1].fieldvalue = DataValidator.inputEntryValidate(p, "mobile");
            }
            this.setState({ selectedProductsArr: arrData })
        }

        const OnSelectDateTime = (selectedDate, item, index, item1, index1) => {
            let rawDate = item1.rawDate,
                viewDate = "";
            if (selectedDate) {
                viewDate = DateConvert.resDataDateFormat(selectedDate);
                rawDate = selectedDate;
            }
            let arrData = this.state.selectedProductsArr
            arrData[index].respArrData[index1].fieldvalue = viewDate;
            arrData[index].respArrData[index1].rawDate = rawDate
            this.setState({ selectedProductsArr: arrData })
            this.OnDatePickerView(false, item, index, item1, index1);
        }
        return (
            <View style={{ backgroundColor: "#EBEBEB", paddingHorizontal: 15, paddingVertical: 15 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => showHideField()} activeOpacity={0.9}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Select Product/Item</Text>
                    </View>
                    <Image source={this.state.showHideProductSec ? ImageName.BLACK_UP_LOGO : ImageName.BLACK_DOWN_LOGO} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                </TouchableOpacity>
                {this.state.showHideProductSec ?
                    <>
                        {this.state.selectedProductsArr.map((item, key) => (
                            <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, paddingHorizontal: 15, paddingVertical: 15, marginTop: 10, borderRadius: 10 }} key={key}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ height: 40, width: 40, justifyContent: "center", alignItems: "center", backgroundColor: Color.COLOR.VIOLET.LAVENDER_INDIGO, borderRadius: 5 }}>
                                        <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, textAlign: "center" }}>{key.toString().length > 1 ? (key + 1) : "0" + (key + 1)}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => onShowHideItem(key)} style={{ paddingLeft: 10, flex: 1 }}>
                                        <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.DARK_LIVER, fontSize: FontSize.XS, }}>{item.productName.fieldvalue}</Text>
                                        <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.BLACK.DARK_LIVER, fontSize: FontSize.XS, }}>{item.productCode.fieldvalue}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => onDeleteItem(item, key)}>
                                        <Image source={ImageName.DELETE_ICON} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onShowHideItem(key)} >
                                        <Image source={item.isShowHide ? ImageName.BLACK_UP_LOGO : ImageName.BLACK_DOWN_LOGO} style={{ height: 12, width: 12, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                </View>
                                {item.isShowHide ?
                                    <View>
                                        <View style={{ borderWidth: 0.5, borderColor: "#ADADAD", backgroundColor: "#ADADAD", marginVertical: 10 }} />
                                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                            {item.respArrData.map((item1, key1) => (
                                                <View key={key1}>
                                                    <View style={{ marginBottom: 10, alignItems: (key1 % 2 == 0) ? "flex-start" : "flex-end", width: Dimension.width / 2 - 30 }}>
                                                        <Text style={styles.productUnitText}>{item1.fieldlabeldesc}</Text>
                                                        {item1.fieldlabeldesc == "Unit" || item1.fieldlabeldesc == "GST" ?
                                                            <Text style={styles.valueText}>{item1.fieldvalue}</Text>
                                                            :
                                                            <View style={{ width: Dimension.width / 2 - 35 }}>
                                                                {/* {item1.fieldlabeldesc == "Auction Delivery Date" ? } */}
                                                                {/* <View style={{ marginRight: (key1 % 2 == 0) ? 5 : 0, marginLeft: (key1 % 2 == 0) ? 0 : 5 }}> */}

                                                                {item1.fieldlabeldesc == "Auction Delivery Date" ?
                                                                    <>
                                                                        <TouchableOpacity onPress={() => this.OnDatePickerView(true, item, key, item1, key1)} style={{ height: 55, justifyContent: "center", alignItems: "center", backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, borderRadius: 10, elevation: 1 }}>
                                                                            <Text style={{ fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, color: item1.fieldvalue.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER }}>{item1.fieldvalue.length > 0 ? item1.fieldvalue : "Enter Date"}</Text>
                                                                        </TouchableOpacity>
                                                                        <DatePicker
                                                                            modal
                                                                            open={item1.visibleDatePicker}
                                                                            date={item1.rawDate}
                                                                            mode={"date"}
                                                                            // maximumDate={new Date()}
                                                                            onConfirm={(date) => OnSelectDateTime(date, item, key, item1, key1)}
                                                                            onCancel={() => this.OnDatePickerView(false, item, key, item1, key1)}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <TextInputBox
                                                                        placeholder={item1.fieldlabeldesc == "Quantity Required" ? "Enter Quantity" : item1.fieldlabeldesc == "Base Price" ? "Base Price" : item1.fieldlabeldesc == "Auction Delivery Date" ? "Enter date" : "Enter (%)"}
                                                                        value={item1.fieldvalue}
                                                                        onChangeText={(value) => onChangeText(value, item, key, item1, key1)}
                                                                        keyboardType={"default"}
                                                                        maxLength={16}
                                                                        returnKeyType={"next"}
                                                                        fontSize={11}
                                                                    // height={50}
                                                                    // isActive={item.check}
                                                                    // onFocus={() => { item.check = true; this.setState({ productDetails: this.state.productDetails }) }}
                                                                    // onBlur={() => { item.check = false; this.setState({ productDetails: this.state.productDetails }) }}

                                                                    />
                                                                }

                                                                {/* <View style={{ width: 20 }} /> */}
                                                            </View>
                                                        }
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                        <View>
                                            <Text style={styles.productUnitText}>{item.productDesc.fieldlabeldesc}</Text>
                                            <Text style={styles.valueText}>{item.productDesc.fieldvalue}</Text>
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        ))}
                    </>
                    : null}
            </View>
        )
    }

    setInitialVendorData = async () => {
        this.setState({
            vendorLoader: true,
            // vendorArr: []
        })
    }

    debouncedFetchData = _debounce(async () => {
        await this.setInitialVendorData()
        await this.getSearcheredVendors();
    }, 400);

    getSearcheredVendors = async () => {
        let reqData = {
            "fromentityvalue": this.state.selectedAuctionCategory.id,
            "toentityvalue": this.state.selectedAuctionType.id,
            "productid": this.state.selectedProductIdArr,
            "search": this.state.searchVendorTxt,
        }
        let responseData = await MiddlewareCheck("searchVendors", reqData, this.props)

        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyVendorData(responseData.response)
                this.setState({ vendorArr: [...modData, ...this.state.vendorArr] })
            }
        }
        this.setState({ vendorLoader: false })
    }

    vendorSec = () => {
        const showHideField = () => {
            this.setState({ showHideVendorSec: !this.state.showHideVendorSec })
        }

        const onChangeText = async (val) => {
            this.setState({ searchVendorTxt: val })
            await this.debouncedFetchData()
        }

        const onSearch = async (val) => {
            this.setState({ searchText: val })


        }
        const onToogle = (isOn) => {
            let arr = this.state.vendorArr;

            for (let i = 0; i < arr.length; i++) {
                arr[i].check = isOn
            }
            this.setState({ selectAllVendors: !this.state.selectAllVendors, vendorArr: arr })
            setVendors()
        }
        const onSelectVendor = async (item, index) => {
            let arr = this.state.vendorArr;
            arr[index].check = !arr[index].check
            this.setState({ vendorArr: arr, selectedVendorObj: item })
            await checkUnCheckArr()
            await setVendors()

        }
        const checkUnCheckArr = async () => {
            let checkCount = 0;
            let arr = this.state.vendorArr;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].check == true) {
                    checkCount++
                }
            }
            if (checkCount == arr.length) {
                this.setState({ selectAllVendors: true })
            } else {
                this.setState({ selectAllVendors: false })
            }
        }
        const setVendors = async () => {
            let arr = this.state.vendorArr;
            allSelectedVendors = arr.filter(vendor => vendor.check);
            this.setState({ selectedVendors: allSelectedVendors })
        }

        const removeItem = async (item, index) => {
            let arr = this.state.vendorArr;
            let selectedArr = this.state.selectedVendors;
            for (let i = 0; i < arr.length; i++) {
                if (item.vendorid == arr[i].vendorid) {
                    arr[i].check = false
                }
            }
            selectedArr.splice(index, 1)
            this.setState({ selectedVendors: selectedArr, vendorArr: arr })
            await checkUnCheckArr()
        }

        return (
            <View style={{ backgroundColor: "#EBEBEB", paddingHorizontal: 15, paddingVertical: 15, marginTop: 2 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => showHideField()} activeOpacity={0.9}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Select Vendors</Text>
                    </View>
                    <Image source={this.state.showHideVendorSec ? ImageName.BLACK_UP_LOGO : ImageName.BLACK_DOWN_LOGO} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                </TouchableOpacity>
                {this.state.isDisableCategoryAndType && this.state.showHideVendorSec ?
                    <>
                        <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, paddingHorizontal: 15, paddingVertical: 15, marginTop: 10, borderRadius: 10 }}>
                            <View>
                                <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Select Vendors</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInputBox
                                    placeholder={"Search"}
                                    value={this.state.searchVendorTxt}
                                    onChangeText={(value) => onChangeText(value)}
                                    keyboardType={"default"}
                                    inactiveBGColor={"#E6E6E6"}
                                    // maxLength={16}
                                    returnKeyType={"done"}
                                    fontSize={14}
                                    isRightIcon={false}
                                    onPressRightIcon={() => onSearch()}
                                    rightIcon={ImageName.SEARCH_ICON}
                                    rightIconStyle={{ height: 40, width: 40 }}
                                />
                            </View>
                            {this.state.selectedVendors.length > 0 ?
                                <View style={{ backgroundColor: "#E6E6E6", borderRadius: 10, paddingTop: 10, paddingHorizontal: 10, marginTop: 10, maxHeight: 200, }}>
                                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                            {this.state.selectedVendors.map((item, key) => (
                                                <View key={key}>
                                                    <View >
                                                        <TouchableOpacity onPress={() => removeItem(item, key)} style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, flexDirection: "row", alignItems: "center", padding: 5, width: Dimension.width / 2 - 42, borderRadius: 5, marginBottom: 10, marginLeft: key % 2 == 0 ? 0 : 2 }}>
                                                            <View >
                                                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: 11 }} numberOfLines={1}>{item.vendorname}</Text>
                                                            </View>
                                                            <View style={{ flex: 1 }} />
                                                            <View>
                                                                <Image source={ImageName.RED_CROSS_ICON} style={{ height: 12, width: 12, resizeMode: "contain" }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{ flex: 1 }} />
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                                : null}
                            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20 }}>
                                <View>
                                    <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.MD }}>Old Vendors</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                <View style={{ marginRight: 10 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM }}>Select All</Text>
                                </View>
                                <ToggleSwitch
                                    isOn={this.state.selectAllVendors}
                                    onColor="green"
                                    offColor="#AEAEAE"
                                    label=""
                                    labelStyle={{ color: "black", fontWeight: "900" }}
                                    size="medium"
                                    onToggle={(isOn) => onToogle(isOn)}
                                />
                            </View>
                            <View style={{ maxHeight: 250 }}>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                    {this.state.vendorLoader ?
                                        <View style={{ height: 100 }}>
                                            <ActivityIndicator />
                                        </View> :
                                        <View >
                                            {this.state.vendorArr.map((item, key) => (
                                                <TouchableOpacity onPress={() => onSelectVendor(item, key)} style={{ flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#EBEDF5", borderRadius: 5, marginBottom: 10 }} key={key}>
                                                    <View style={{ borderRadius: 5, padding: 2, justifyContent: "center", alignItems: "center", backgroundColor: item.check ? "#00B65E" : "#fff", borderWidth: 1, borderColor: item.check ? "#00B65E" : "#9FA4B2" }}>
                                                        <Image source={ImageName.WHITE_TICK_ICON} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                                    </View>
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, fontSize: 11 }}>{item.vendorname}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </>
                    :
                    null
                }
            </View>
        )
    }

    auctionDetailSec = () => {
        const showHideField = () => {
            this.setState({ showHideAuctionDetailSec: !this.state.showHideAuctionDetailSec });
        };

        const onChangeText = async (val, item, index) => {
            if (item.fieldlabeldesc == "Extra Closing Duration" || item.fieldlabeldesc == "Shipment From" || item.fieldlabeldesc == "Shipment To" || item.fieldlabeldesc == "Received QTY(MT)" || item.fieldlabeldesc == "Ref Id" || item.fieldlabeldesc == "Delivery Instruction" || item.fieldlabeldesc == "Auction Description") {
                let auctionDataArr = this.state.auctionDetailsData;
                auctionDataArr[index].fieldvalue = val;
                this.setState({ auctionDetailsData: auctionDataArr });
            }
        };

        const OnSelectDateTime = (selectedDate, item, index) => {
            let rawDate = item.rawDate,
                viewDate = "",
                viewTime = "";
            if (selectedDate) {
                viewDate = DateConvert.resDataDateFormat(selectedDate);
                viewTime = DateConvert.TimeFormat24Hrs(selectedDate);
                rawDate = selectedDate;
            }

            let auctionDataArr = this.state.auctionDetailsData;
            auctionDataArr[index].fieldvalue = (item.fieldlabeldesc == "Auction Start Date" || item.fieldlabeldesc == "Auction End Date") ? viewDate : viewTime;
            auctionDataArr[index].rawDate = rawDate
            this.setState({ auctionDetailsData: auctionDataArr })
            OnDatePickerView(false, item, index);
        }

        const OnDatePickerView = (type, item, index) => {
            let auctionDataArr = this.state.auctionDetailsData;
            auctionDataArr[index].visibleDatePicker = type
            this.setState({ auctionDetailsData: auctionDataArr })
        }


        return (
            <View style={{ backgroundColor: "#EBEBEB", paddingHorizontal: 15, paddingVertical: 15, marginTop: 2 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => showHideField()} activeOpacity={0.9}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: 'Poppins-Medium', fontSize: 14 }}>Auction Details</Text>
                    </View>
                    <Image source={this.state.showHideAuctionDetailSec ? ImageName.BLACK_UP_LOGO : ImageName.BLACK_DOWN_LOGO} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                </TouchableOpacity>
                {this.state.isDisableCategoryAndType && this.state.showHideAuctionDetailSec ?
                    <View style={{ marginVertical: 10, borderRadius: 15, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, padding: 15 }}>
                        {this.state.auctionDetailsData.map((item, index) => (
                            <View key={index} style={{ marginTop: 10 }}>
                                {(item.fieldlabeldesc == "Auction Start Date" || item.fieldlabeldesc == "Auction End Date" || item.fieldlabeldesc == "Auction Start Time" || item.fieldlabeldesc == "Auction End Time") ?
                                    // <Text style={{ color: 'black' }}>DatePicker</Text>
                                    <View>
                                        <TouchableOpacity onPress={() => OnDatePickerView(true, item, index)} style={{ height: 45, justifyContent: "center", alignItems: "flex-start", backgroundColor: "#E6E6E6", borderRadius: 10, elevation: 1 }}>
                                            <Text style={{ marginLeft: 20, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 14, color: item.fieldvalue.length > 0 ? Color.COLOR.GRAY.DARK_GRAY_COLOR : Color.COLOR.GRAY.SILVER }}>{item.fieldvalue.length > 0 ? item.fieldvalue : item.fieldlabeldesc}</Text>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            open={item.visibleDatePicker}
                                            date={item.rawDate}
                                            mode={(item.fieldlabeldesc == "Auction Start Date" || item.fieldlabeldesc == "Auction End Date") ? "date" : "time"}
                                            // maximumDate={new Date()}
                                            onConfirm={(date) => OnSelectDateTime(date, item, index)}
                                            onCancel={() => OnDatePickerView(false, item, index)}
                                        />
                                    </View>
                                    : null
                                }
                                {(item.fieldlabeldesc == "Extra Closing Duration" || item.fieldlabeldesc == "Shipment From" || item.fieldlabeldesc == "Shipment To" || item.fieldlabeldesc == "Received QTY(MT)" || item.fieldlabeldesc == "Ref Id" || item.fieldlabeldesc == "Delivery Instruction" || item.fieldlabeldesc == "Auction Description") ?
                                    <TextInputBox
                                        placeholder={item.fieldlabeldesc}
                                        value={item.fieldvalue} // Ensure value is bound to item.fieldvalue
                                        onChangeText={(value) => onChangeText(value, item, index)}
                                        keyboardType={"default"}
                                        inactiveBGColor={"#E6E6E6"}
                                        returnKeyType={"done"}
                                        fontSize={14}
                                        isRightIcon={false}
                                        // onPressRightIcon={() => onSearch()}
                                        rightIcon={ImageName.SEARCH_ICON}
                                        rightIconStyle={{ height: 40, width: 40 }}
                                        height={(item.fieldlabeldesc == "Delivery Instruction" || item.fieldlabeldesc == "Auction Description") ? 90 : 45}
                                    />
                                    : null
                                }
                                {(item.fieldlabeldesc == "Bidder View Permission") ?
                                    // <Text style={{ color: 'black' }}>Dropdown</Text>
                                    <SearchableDropdownInputBox
                                        selectedValue={this.state.selectedBidderPermObj.id ? this.state.selectedBidderPermObj.id.toString() : "0"}
                                        data={this.state.bidderPermDataArr}
                                        upDownImages={[ImageName.BLACK_UP_LOGO, ImageName.BLACK_DOWN_LOGO]}
                                        onSelect={(value) => this.onSelectBidderPermission(value, item, index)}
                                        headerText={"Select Bidder View Permission"}
                                        selectedText={this.state.selectedBidderPermObj.name ? this.state.selectedBidderPermObj.name : "Select Auction Category"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        borderRadius={10}
                                        fontSize={14}
                                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                                        // selectedTextColor={"#747C90"}
                                        unSelectedTextColor={Color.COLOR.GRAY.SILVER}
                                        // backgroundColor={"#F0F4F7"}
                                        isSearchable={false}
                                    // isDisabled={this.state.isDisableCategoryAndType}
                                    />
                                    : null
                                }
                            </View>
                        ))}
                    </View>
                    : null
                }
            </View>
        );
    }

    TermsConditionSec = () => {
        const showHideField = () => {
            this.setState({ showHideTermsCondition: !this.state.showHideTermsCondition });
        };

        return (
            <View style={{ backgroundColor: "#EBEBEB", paddingHorizontal: 15, paddingVertical: 15, marginTop: 2 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => showHideField()} activeOpacity={0.9}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Color.COLOR.BLACK.DARK_LIVER, fontFamily: 'Poppins-Medium', fontSize: 14 }}>Terms & Conditions</Text>
                    </View>
                    <Image source={this.state.showHideTermsCondition ? ImageName.BLACK_UP_LOGO : ImageName.BLACK_DOWN_LOGO} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                </TouchableOpacity>
                {this.state.showHideTermsCondition ?
                    <>
                        {this.state.tearmsDetails.length > 0 ?
                            <View style={{ marginTop: 10, borderRadius: 15, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, padding: 15 }}>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}>
                                    <View>
                                        <RenderHTML
                                            tagsStyles={mixedStyle}
                                            contentWidth={Dimension.width}
                                            source={{ html: this.state.tearmsDetails }}
                                        />
                                    </View>
                                </ScrollView>
                            </View> :
                            <View style={{ marginTop: 10, borderRadius: 15, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, padding: 15, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>No data to display</Text>
                            </View>
                        }
                    </>
                    : null
                }
            </View>
        )
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    onPublish = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "clientid": userInfo.clientid,
            "userid": userInfo.id,
            "roleid": userInfo.roleId,
            "entitytypeid": userInfo.entitytypeid,
            "enttityid": userInfo.entityfieldmasterid,
            "templateid": 1,
            "allFlag": this.state.selectAllVendors ? 1 : 0,
            "selected_category": this.state.selectedAuctionCategory.id,
            "selected_auctiontype": this.state.selectedAuctionType.id,
            "remainder": [],
            "product": modProductData(this.state.selectedProductsArr),
            "vendor": this.state.selectedVendors,
            "terms": this.state.termsConditionDataArr,
            "auction": modAuctionData(this.state.auctionDetailsData)
        }
        let validateData = validateReqData(reqData);
        if (validateData) {
            socketServices.emit("auction_creation", reqData);
            // Toaster.ShortCenterToaster("Auction created successfully!");
            this.props.navigation.goBack();
        }
    }


    footerButtonSec = () => {
        return (
            <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity onPress={() => this.onCancel()} style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.COLOR.GRAY.CORDUROY, backgroundColor: "#EBEBEB", paddingHorizontal: 50, paddingVertical: 14 }}>
                        <Text style={{ color: "#2C3338", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => this.onPublish()} style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.COLOR.GRAY.CORDUROY, backgroundColor: Color.COLOR.VIOLET.LAVENDER_INDIGO, paddingHorizontal: 50, paddingVertical: 14 }}>
                        <Text style={{ color: "#fff", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Publish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.auctionCreationSec()}
                    {this.selectedProductArrSec()}
                    {this.vendorSec()}
                    {this.auctionDetailSec()}
                    {this.TermsConditionSec()}
                    {this.footerButtonSec()}
                </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAuction);
