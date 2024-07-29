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
    backgroundColor: "#FE9346",
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
    height: 20,
    width: 20,
    resizeMode: "contain",
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
  backImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  primeVluDateSec: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  startEndDate: {
    flex: 0.6,
    alignItems: "flex-end",
    marginRight: "2%",
  },
  item: {
    flexDirection: "row",
    marginTop: 10,
  },
  firstItem: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-start",
  },
  secondItem: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "flex-end",
  },
  descItem: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  boxStyle: {
    borderColor: "#CECECE",
    borderWidth: 0.7,
    marginTop: 15,
  },
  productItem: {
    flexDirection: "row",
    marginTop: 20,
  },
  detailsTextSec: {
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
  detailTxt: {
    color: "#7E47F3",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    textDecorationLine: "underline",
  },
  mapListSec: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "2%",
  },
  keyValTxt: {
    color: Color.COLOR.BLACK.DARK_LIVER,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  btnSec: {
    marginHorizontal: "10%",
    flexDirection: "row",
    marginTop: 30,
  },
  txtBtnLoadSec: {
    marginHorizontal: "10%",
    flexDirection: "row",
    marginTop: 30,
  },
  activityLoadSec: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "45%",
  },
  activityLoadSubSec: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
  },
});

export default styles;
