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
    color: "#4F4E4E",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  productUnitText: {
    color: "#8C8C8C",
    fontSize: FontSize.XS,
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

  // list Details section end here

  // tearmsCondition Modal Section start from here

  modalview: {
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
  activityLoadSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
  },
  dataListSec: {
    flex: 1,
    marginHorizontal: "2%",
  },
  itemsSec: {
    flex: 1,
    flexDirection: "row",
  },
  itemSec: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
  },
  timerSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  timer: {
    marginLeft: "6%",
    flexDirection: "row",
  },
  backLogo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  loaderSec: {
    height: Dimension.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
