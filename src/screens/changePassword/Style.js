import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: Dimension.height,
    flex: 1,
  },
  formInputSection: {
    marginTop: 25,
    marginHorizontal: "10%",
  },

  backgroundImage: {
    width: 278,
    height: 244,
    resizeMode: "cover",
  },
  formLabel: {
    fontSize: 12,
    color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginTop: 15,
    marginLeft: "2%",
  },
  formInputBox: {
    height: 55,
    backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE,
    elevation: 1,
    borderRadius: 10,
    marginTop: 8,
    // flexDirection: 'row',
    borderColor: "#000",
  },
  formTextInput: {
    fontSize: FontSize.XS,
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontFamily: FontFamily.FONTS.INTER.REGULAR,
    flex: 1,
    marginHorizontal: 21,
  },
  eyeLogo: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  buttonSection: {
    marginTop: 25,
  },
  buttonView: {
    height: 55,
    borderRadius: 10,
    backgroundColor: Color.COLOR.BLUE.CAPRI,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: FontSize.SM,
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },
  belowImageView: {
    // justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: "10%"
  },
  loginText: {
    color: Color.COLOR.GRAY.DAVY_GRAY,
    fontSize: 36,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },

  // changePasswordText: {
  //     color: '#555860',
  //     fontSize: 16,
  //     fontFamily: FontFamily.FONTS.INTER.BOLD,
  //     marginTop: 30
  // },
  passConfirmText: {
    color: Color.COLOR.GRAY.DAVY_GRAY,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.INTER.LIGHT,
    marginTop: 5,
    // textAlign: 'center'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginTop: 10,
  },
  backSec: {
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
  },
  // keyImgSec: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#EEECFA',
  //     height: 120,
  //     width: 120,
  //     borderRadius: 30,
  //     elevation: 2
  // },
  keyImg: {
    height: Dimension.height / 3.5,
    width: "90%",
    resizeMode: "cover",
  },
  backImgTab: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: "4%",
  },
  backLogo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  changePassSec: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  auctionLogo: {
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  changePassTxt: {
    color: "#2D0F6D",
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
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
  currentPassTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginTop: 10,
    marginLeft: "2%",
  },
  newPassTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginTop: 10,
    marginLeft: "2%",
  },
  confirmPassTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    marginTop: 10,
    marginLeft: "2%",
  },
});

export default styles;
