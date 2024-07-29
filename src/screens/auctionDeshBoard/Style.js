import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimension.height,
    width: Dimension.width,
    backgroundColor: "#ffffff",
  },

  space: {
    marginLeft: "5%",
    marginRight: "5%",
  },

  headerBelowBox: {
    borderRadius: 15,
    backgroundColor: "#7E47F3",
    paddingVertical: "4%",
    marginTop: 5,
  },

  imgSec: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },

  belowBoxValueSec: {
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
  },

  belowBoxTextSec: {
    marginRight: "5%",
  },
  workText: {
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    color: Color.COLOR.WHITE.PURE_WHITE,
    textAlign: "right",
  },
  smallBoxText: {
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    textAlign: "right",
  },
  bigNumberText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XXXL,
    fontFamily: FontFamily.FONTS.INTER.THIN,
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

  skyBox: {
    borderRadius: 15,
    backgroundColor: "#63CCED",
    paddingVertical: "4%",
    marginTop: 30,
  },
  yellowBox: {
    borderRadius: 15,
    backgroundColor: "#FFCC6A",
    paddingVertical: "4%",
    marginTop: 30,
  },
  orangeBox: {
    borderRadius: 15,
    backgroundColor: "#FE9346",
    paddingVertical: "4%",
    marginTop: 30,
  },
  bidText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 30,
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
  skySmallBox: {
    borderRadius: 8,
    backgroundColor: "#63CCED",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  columnSec: {
    flexDirection: "column",
    marginLeft: "4%",
    flex: 0.4,
  },

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: 0.8,
    borderRadius: 15,
    marginTop: 20,
  },

  numberText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    fontSize: 17,
  },
  auctionText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  greenCircel: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: "#09BC1B",
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
  dataList: {
    flex: 1,
    marginHorizontal: "2%",
  },
  liveListSec: {
    flex: 1,
    flexDirection: "row",
  },
  liveSec: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
  },
  timerItemsSec: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
  },
  timerItemSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerSec: {
    marginLeft: "6%",
    flexDirection: "row",
  },
  dateSec: {
    flexDirection: "column",
    marginLeft: "10%",
  },

  floatingButton: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: 0.8,
    // shadowRadius: 3,
    position: "absolute",
    bottom: 20,
    backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    overflow: "hidden",
    elevation: 9
  }
});

export default styles;
