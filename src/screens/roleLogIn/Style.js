import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from "../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: Dimension.height,
    flex: 1,
  },

  welcomeText: {
    fontSize: FontSize.SM,
    color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
  },

  formInputSection: {
    marginTop: 10,
    marginHorizontal: "10%",
  },
  formLabel: {
    fontSize: 13,
    color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
  },
  formInputBox: {
    height: 55,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  formInputLeftIconView: {
    marginHorizontal: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  formInputLeftIcon: {
    height: 14,
    width: 16,
    resizeMode: "cover",
  },
  verticalBlueLine: {
    height: 20,
    width: 2,
    backgroundColor: Color.COLOR.BLUE.MAXIMUM_BLUE,
  },
  textInput: {
    fontSize: FontSize.SM,
    color: Color.COLOR.GRAY.SONIC_SILVER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginHorizontal: 21,
    flex: 1,
  },
  focusedTextInput: {
    fontSize: FontSize.SM,
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    marginHorizontal: 21,
    flex: 1,
  },
  forgotText: {
    fontSize: FontSize.XS,
    color: Color.COLOR.GRAY.SONIC_SILVER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    alignSelf: "flex-end",
  },
  forgotTextView: {
    justifyContent: "flex-end",
    // alignItems:"flex-end",
    flex: 0.4,
  },
  chooseProductText: {
    fontSize: FontSize.XS,
    color: Color.COLOR.GRAY.SONIC_SILVER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonSection: {
    marginTop: 35,
  },
  buttonView: {
    height: 55,
    borderRadius: 10,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
  },
  buttonText: {
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },
  alertMsg: {
    fontSize: 11,
    color: Color.COLOR.RED.PURE_RED,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
  },
  textTremsConditions: {
    color: Color.COLOR.BLUE.VIOLET_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    textDecorationLine: "underline",
  },
  loginSec: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  auctiuonImg: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  loginTxt: {
    color: "#2D0F6D",
    fontSize: FontSize.XXL,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  procedureTxt: {
    color: "#A0A2B5",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    top: -6,
  },
  loginLogoSec: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  loginLogo: {
    height: 230,
    width: 250,
    resizeMode: "contain",
  },
  inputSec: {
    backgroundColor: "#7E47F3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chooseLoginTxt: {
    color: "#120037",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 40,
  },
  titleDesc: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    marginTop: 8,
  },
});

export default styles;
