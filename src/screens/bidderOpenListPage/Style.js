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
    backgroundColor: "#FFCC6A",
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
    flex: 1,
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
  greenCircel: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: "#7ED887",
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
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: "#09BC1B",
    justifyContent: "center",
    alignItems: "center",
  },
  activityLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
  },
  whiteRightLogo: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  backImg: {
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
