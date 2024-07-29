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
  mainSec: {
    backgroundColor: Color.COLOR.VIOLET.LAVENDER_INDIGO,
    height: Dimension.height,
    width: Dimension.height,
  },
  subSec: {
    marginHorizontal: "10%",
    marginTop: 84,
    justifyContent: "center",
    alignItems: "center",
  },
  auctionLogoSec: {
    height: 262,
    width: 262,
    borderRadius: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
  },
  auctionLogo: {
    height: 130,
    width: 143,
    resizeMode: "contain",
  },
});

export default styles;
