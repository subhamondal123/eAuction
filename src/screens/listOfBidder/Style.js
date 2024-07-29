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
    borderRadius: 15,
    marginTop: 20,
  },
  subBox: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    backgroundColor: "#F5F5F5",
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
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginLeft: "10%",
  },

  bigGreenCircel: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "#7ED887",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
  },
  bigDeepgreenCircel: {
    height: 5,
    width: 5,
    borderRadius: 100,
    backgroundColor: "#00710C",
  },

  // list Details Section Start from here

  productText: {
    color: "#4F4E4E",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  decovalText: {
    color: "#8C8C8C",
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    fontSize: FontSize.XS,
    marginTop: 8,
  },
  deliveryLocationText: {
    color: "#8C8C8C",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    marginTop: 10,
  },
  valueText: {
    color: "#8C8C8C",
    fontSize: 13,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  productUnitText: {
    color: "#4F4E4E",
    fontSize: 15,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
  },
  productUnitGstText: {
    color: "#4F4E4E",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
  },
  putInformationText: {
    color: "#4F4E4E",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 15,
  },
  availableQuentityText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "4%",
  },
  priceText: {
    color: "#6A6A6A",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "4%",
  },
  gstText: {
    color: "#6A6A6A",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "10%",
  },
  subTotalText: {
    color: "#4F4E4E",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1,
  },
  ansValueText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  grayBox: {
    borderRadius: 8,
    backgroundColor: "#E6E6E6",
    paddingVertical: "5%",
    marginTop: 10,
    justifyContent: "center",
    flex: 1,
  },

  skySmallBox: {
    borderRadius: 8,
    backgroundColor: "#63CCED",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skySecDateText: {
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    fontSize: FontSize.XS,
  },

  skySectimeText: {
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    fontSize: FontSize.XS,
    textAlign: "right",
  },
  skyNumberTextCircel: {
    marginLeft: "10%",
  },

  // list Details section end here

  // tearmsCondition Modal Section start from here

  modalview: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    borderRadius: 10,
    maxHeight: Dimension.height,
    paddingBottom: 20,
  },
  boxSideSpace: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    // flexDirection: 'row',
    // alignItems: 'center'
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
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    flex: 1,
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
  },
  positionBox: {
    borderRadius: 8,
    backgroundColor: Color.COLOR.YELLOW.BOOGER_BUSTER,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: "2%",
    flexDirection: "row",
  },

  circelText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    // marginTop: 3
  },
  vendorNameText: {
    color: Color.COLOR.BLACK.BLACK_COFFEE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    top: -3,
  },

  boxHeaderText: {
    fontSize: FontSize.SM,

    fontFamily: FontFamily.FONTS.POPPINS.EXTRA_BOLD,
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
    fontSize: 11,
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

  // =====================================================================================
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
  activityLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
  },
  itemRank: {
    color: Color.COLOR.GREEN.MOSS_GREEN,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    transform: [{ rotate: "-60deg" }],
    marginTop: 1,
  },
  listSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  topBidderTab: {
    flex: 0.6,
    marginLeft: "1%",
    flexDirection: "column",
    justifyContent: "center",
  },
  violetImgSec: {
    backgroundColor: "#fff",
    height: 26,
    width: 26,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  violetImg: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  backImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  productItem: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  productFirstItem: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-start",
  },
  productSecondItem: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  totalAmntSec: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  thankYouTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
  },
  selectionTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 10,
  },
  commentTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 10,
  },
  bigBtnSec: {
    marginHorizontal: "5%",
    flexDirection: "row",
    marginTop: 30,
  },
  activityMainSec: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "45%",
  },
  activitySubSec: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  loaderSec: {
    height: Dimension.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
