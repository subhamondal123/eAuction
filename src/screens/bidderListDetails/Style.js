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

  yellowOpenTextSec: {
    backgroundColor: "#FEBF46",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: 22,
    width: 45,
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
  valueGstText: {
    color: "#4F4E4E",
    fontSize: FontSize.XS,
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
    marginTop: 10,
  },
  bidderSubBox: {
    borderWidth: 1,
    borderColor: "#D7D7D7",
    backgroundColor: "#f5f5f5",
    height: 50,
    justifyContent: "center",
  },
  bidderCurrentSubBox: {
    borderWidth: 1,
    borderColor: "#D7D7D7",
    backgroundColor: "#53ed65",
    height: 50,
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
    color: Color.COLOR.BLACK.DARK_LIVER,
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
  modalRebidMarginSec: {
    marginHorizontal: "5%",
    marginTop: 5,
    maxHeight: "80%",
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

  // ====================================================================

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

  // Selection Modal Start Css

  selectionModalview: {
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
  selectionBoxSideSpace: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectionUnderline: {
    marginTop: 5,
    borderColor: Color.COLOR.BLACK.DARK_LIVER,
    borderWidth: 0.5,
    marginHorizontal: "6%",
  },

  blueSmallBox: {
    borderRadius: 8,
    backgroundColor: "#7E47F3",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  BoxMarginSubSec: {
    flex: 1,
    flexDirection: "row",
  },
  allItemSec: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
  },
  startEndTimeSec: {
    marginLeft: "38%",
    flexDirection: "column",
  },
  whiteRightLogo: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  auctionSec: {
    flexDirection: "row",
    marginTop: 10,
  },
  typeSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-start",
  },
  typeSecArr: {
    // alignItems: "flex-end",
    width: Dimension.width / 2 - 25,
    marginBottom: 10
  },
  auctionEndSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  descSec: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  itemListSec: {
    marginHorizontal: "3%",
    padding: 5,
  },
  nameGstSec: {
    flexDirection: "row",
    marginTop: 5,
  },
  productFirstTxt: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-start",
  },
  productSecondTxt: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  unitQtySec: {
    flexDirection: "row",
    marginTop: 20,
  },
  priceSizeSec: {
    flexDirection: "row",
    marginTop: 10,
  },
  viewStyle: {
    borderColor: "#CECECE",
    borderWidth: 0.7,
    marginTop: 15,
  },
  bidProSentsTxt: {
    color: "#4F4E4E",
    fontSize: 16,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
  },
  itemTxtInputSec: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  qtySec: {
    flexDirection: "column",
    flex: 0.5,
  },
  priceSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  inputSec: {
    borderRadius: 12,
    flex: 0.5,
  },
  cgstSec: {
    flexDirection: "column",
    flex: 0.3,
  },
  sgstSec: {
    flexDirection: "column",
    flex: 0.3,
  },
  igstSec: {
    flexDirection: "column",
    flex: 0.4,
  },
  costSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },

  boxStyle: {
    borderColor: "#CECECE",
    borderWidth: 0.7,
    marginTop: 15,
  },
  subTotalSec: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  subTotalTxt: {
    color: "#4F4E4E",
    fontSize: 16,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    flex: 1,
  },
  subAmountTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 16,
    fontFamily: FontFamily.FONTS.POPPINS.EXTRA_BOLD,
  },
  totalAmntSec: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  totalAmntTxt: {
    color: "#4F4E4E",
    fontSize: 16,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    flex: 1,
  },
  totalAmnt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 16,
    fontFamily: FontFamily.FONTS.POPPINS.EXTRA_BOLD,
  },
  detailTabSec: {
    flexDirection: "row",
    marginTop: 20,
  },
  tearmsCondiSec: {
    color: "#8C8C8C",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1,
  },
  detailTxt: {
    color: "#7E47F3",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    textDecorationLine: "underline",
  },
  bigBtnSec: {
    flexDirection: "row",
    marginTop: 25,
  },
  activityLoad: {
    height: Dimension.height / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  itemDataSec: {
    backgroundColor: Color.COLOR.WHITE.ANTI_FLASH_WHITE,
    paddingVertical: 8,
    borderRadius: 12,
  },
  itemSec: {
    flexDirection: "row",
    marginTop: 5,
  },
  blackGreyImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  txtBtn: {
    marginHorizontal: "10%",
    flexDirection: "row",
    marginTop: 30,
  },
  bidDataSec: {
    backgroundColor: "#F5F5F5",
    maxHeight: "50%",
  },
  nameUnitSec: {
    flexDirection: "row",
    marginTop: 5,
  },
  qtyPriceSec: {
    flexDirection: "row",
    marginTop: 10,
  },
  parsentageSec: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subTotal2Sec: {
    flexDirection: "row",
    marginTop: 10,
  },
  subTotalSubSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-start",
  },
  totalAmnt2Txt: {
    color: "#4F4E4E",
    fontSize: 12,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    flex: 1,
  },
  totalAmnt2: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 12,
    fontFamily: FontFamily.FONTS.POPPINS.EXTRA_BOLD,
  },
  currentBidSec: {
    backgroundColor: "#F5F5F5",
    maxHeight: "60%",
  },
  txtInputBtn: {
    marginTop: 10,
    marginHorizontal: "5%",
  },
  bigTxtBtn: {
    flexDirection: "row",
    marginTop: 25,
  },
  activityLogSec: {
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
