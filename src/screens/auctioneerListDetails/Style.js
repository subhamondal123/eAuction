import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from "../../enums";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1,
    },
    space: {
        marginHorizontal: "3%",
    },
    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: 0.8,
        borderRadius: 2,
        marginTop: 20,
    },
    subBox: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#D7D7D7",
        backgroundColor: "#EBEBEB",
        height: 60,
        justifyContent: "center",
    },
    BoxMarginSec: {
        marginHorizontal: "2%",
        flexDirection: "row",
        alignItems: "center",
    },
    violetSmallBox: {
        borderRadius: 8,
        backgroundColor: "#7E47F3",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    yellowOpenTextSec: {
        backgroundColor: "#FEBF46",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        height: 22,
        width: 45,
    },

    numberText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        fontSize: 17,
    },
    columnSec: {
        flexDirection: "column",
        marginLeft: "4%",
        flex: 0.4,
    },
    auctionText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    auctionTypeText: {
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    liveGreenCircel: {
        height: 22,
        width: 22,
        borderRadius: 100,
        backgroundColor: "#7ED887",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "20%",
    },
    deepGreenCircel: {
        height: 10,
        width: 10,
        borderRadius: 100,
        backgroundColor: "#00710C",
    },

    violetLiveTextSec: {
        backgroundColor: "#8954F9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        height: 22,
    },
    textLive: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    timeGrayText: {
        color: "#7E47F3",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    hrsText: {
        color: Color.COLOR.GRAY.GRAY_COLOR,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    violetDropDownLogo: {
        height: 18,
        width: 18,
        resizeMode: "contain",
        marginLeft: "8%",
    },
    productUnitText: {
        color: "#8C8C8C",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    },
    valueText: {
        color: "#4F4E4E",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    },
    deliveryLocationText: {
        color: "#8C8C8C",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        marginTop: 10,
    },
    // ========================================================================

    // Bidder List Css start from here

    bidderMainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: 0.8,
        marginTop: 20,
    },
    bidderSubBox: {
        borderWidth: 1,
        borderColor: "#D7D7D7",
        backgroundColor: "#F5F5F5",
        height: 60,
        justifyContent: "center",
    },
    violetCircel: {
        height: 25,
        width: 25,
        borderRadius: 100,
        backgroundColor: "#7E47F3",
        justifyContent: "center",
        alignItems: "center",
    },
    violetCircelNumberText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginTop: 2,
    },
    positionBox: {
        borderRadius: 8,
        backgroundColor: Color.COLOR.YELLOW.BOOGER_BUSTER,
        paddingHorizontal: 10,
        alignItems: "center",
        paddingVertical: "2%",
        flexDirection: "row",
    },
    whiteBox: {
        borderRadius: 8,
        backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
        paddingHorizontal: 10,
        alignItems: "center",
        paddingVertical: "2%",
        flexDirection: "row",
        borderWidth: 0.5,
        elevation: 1,
        borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    },

    circelText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        marginTop: 3,
    },
    vendorNameText: {
        color: Color.COLOR.BLACK.BLACK_COFFEE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        top: -3,
    },

    boxHeaderText: {
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        color: "#596627",
    },
    grayCircel: {
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#97A5AE",
        justifyContent: "center",
        alignItems: "center",
    },
    dropDownLogo: {
        height: 18,
        width: 18,
        resizeMode: "contain",
        marginTop: 2,
    },

    positionValueText: {
        color: "#596627",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        top: -3,
    },
    detailsText: {
        color: "#7E47F3",
        textDecorationLine: "underline",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    totalText: {
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    bidderText: {
        color: "#2C2833",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    listBidderSec: {
        marginHorizontal: "4%",
        flexDirection: "row",
        alignItems: "center",
    },
    flexRowView: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lightYellowCircel: {
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: Color.COLOR.GREEN.MOSS_GREEN,
        justifyContent: "center",
        alignItems: "center",
    },
    skySmallBox: {
        borderRadius: 8,
        backgroundColor: "#63CCED",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    yellowSmallBox: {
        borderRadius: 8,
        backgroundColor: "#FFCC6A",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    greenCircel: {
        height: 30,
        width: 30,
        borderRadius: 100,
        backgroundColor: "#7ED887",
        justifyContent: "center",
        alignItems: "center",
    },
    bigDeepgreenCircel: {
        height: 22,
        width: 22,
        borderRadius: 100,
        backgroundColor: "#09BC1B",
        justifyContent: "center",
        alignItems: "center",
    },

    // =================================================================
    twelvePointBurst: {},
    twelvePointBurstMain: {
        width: 22,
        height: 22,
        borderRadius: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    },
    twelvePointBurst30: {
        width: 22,
        height: 22,
        position: "absolute",
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 3,
        top: 0,
        right: 0,
        transform: [{ rotate: "30deg" }],
    },
    twelvePointBurst60: {
        width: 22,
        height: 22,
        position: "absolute",
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        right: 0,
        transform: [{ rotate: "60deg" }],
    },

    // tearmsCondition Modal Section start from here

    modalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 18,
        width: Dimension.width / 1.2,
        maxHeight: Dimension.height / 1.1,
        alignSelf: "center",
        // right: 0,
        // left: 0,
        // bottom: -21,
        // position: 'absolute',
        // marginHorizontal: "10%"
    },
    boxSideSpace: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    pinkSmallBox: {
        borderRadius: 8,
        backgroundColor: "#FFA0FB",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteActivityLogImg: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    textActivityLog: {
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        flex: 1,
        marginLeft: "5%",
    },
    auctionCrossImg: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    underline: {
        marginTop: 15,
        borderColor: Color.COLOR.BLACK.DARK_LIVER,
        borderWidth: 0.5,
        marginHorizontal: "6%",
    },
    modalMarginSec: {
        marginHorizontal: "5%",
        marginTop: 15,
    },
    tearmsAndConditionText: {
        color: Color.COLOR.BLACK.DARK_LIVER,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    tearmsConditionValue: {
        color: Color.COLOR.BLACK.DARK_LIVER,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    },

    activityLogBox: {
        padding: 5,
        paddingHorizontal: 8,
        backgroundColor: "#EBEBEB",
        borderColor: "#000",
        borderWidth: 0.4,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    // Activity Modal Section start from here

    activityModalview: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 18,
        width: Dimension.width / 1.2,
        maxHeight: Dimension.height,
        alignSelf: "center",
        // right: 0,
        // left: 0,
        // bottom: -21,
        // position: 'absolute',
        // marginHorizontal: "10%"
    },

    flexRowSec: {
        flexDirection: "row",
        marginTop: 8,
    },
    textActivityQuentity: {
        color: "#6C6C6C",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        flex: 1,
    },
    activityQuantityValue: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
    gstText: {
        color: Color.COLOR.GRAY.DIM_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        flex: 1,
    },
    gstValueText: {
        color: Color.COLOR.GRAY.DIM_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    sgstText: {
        color: Color.COLOR.GRAY.DIM_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    },
    dateText: {
        color: Color.COLOR.BLACK.DARK_LIVER,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "5%",
    },
    fridgeTotalValueText: {
        color: Color.COLOR.GRAY.DIM_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "5%",
    },
    priceText: {
        color: Color.COLOR.GRAY.DIM_GRAY,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
        flex: 0.5,
    },
    priceValueText: {
        color: Color.COLOR.GREEN.ISLAMIC_GREEN,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: "5%",
    },
    backImg: {
        height: 30,
        width: 30,
        resizeMode: "contain",
    },
    circleLogoTxt: {
        color: Color.COLOR.GREEN.MOSS_GREEN,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        transform: [{ rotate: "-60deg" }],
        marginTop: 1,
    },
    mainListSec: {
        flex: 1,
        flexDirection: "row",
    },
    listTxtSec: {
        flexDirection: "row",
        alignItems: "center",
        flex: 0.6,
    },
    dateTxtSec: {
        marginLeft: "38%",
        flexDirection: "column",
    },
    whiteLogo: {
        height: 18,
        width: 18,
        resizeMode: "contain",
    },
    typeCategoryTxtSec: {
        flexDirection: "row",
        marginTop: 10,
    },
    typeTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    categoryTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-end",
    },
    startEndTxtSec: {
        flexDirection: "row",
        marginTop: 10,
    },
    startTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    endTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-end",
    },
    descSec: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    instructSec: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    viewSec: {
        marginTop: 10,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    viewStyle: {
        borderColor: "#CECECE",
        borderWidth: 0.7,
        marginTop: 15,
    },
    productNameSec: {
        flexDirection: "row",
        marginTop: 20,
    },
    nameTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    unitQtySec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    unitTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    qtyTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-end",
    },
    priceSizeSec: {
        flexDirection: "row",
        marginTop: 10,
    },
    priceTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-start",
    },
    sizeTxtSec: {
        flexDirection: "column",
        flex: 0.5,
        alignItems: "flex-end",
    },
    detailsTabSec: {
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: "3%",
    },
    readAllTxt: {
        color: "#8C8C8C",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        flex: 1,
    },
    detailsTxt: {
        color: "#7E47F3",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        textDecorationLine: "underline",
    },
    listSec: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: "2%",
    },
    keyValueTxt: {
        color: Color.COLOR.BLACK.DARK_LIVER,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    activityLoadSec: {
        height: Dimension.height / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    itemDataSec: {
        backgroundColor: Color.COLOR.WHITE.ANTI_FLASH_WHITE,
        paddingVertical: 8,
        borderRadius: 12,
    },
    textSec: {
        flexDirection: "row",
        marginTop: 5,
    },
    greyCalImg: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    activityLogTab: {
        flexDirection: "row",
        marginTop: 15,
    },
    activityLogTxt: {
        color: "#4F4E4E",
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        flex: 1,
    },
});

export default styles;
