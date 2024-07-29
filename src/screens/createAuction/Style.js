const { StyleSheet } = require("react-native");
const { Dimension, Color, FontSize, FontFamily } = require("../../enums");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1,
    },
    labelTxt: {
        color: "#504F4F",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    productUnitText: {
        color: "#8C8C8C",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    valueText: {
        color: "#4F4E4E",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    },
})

export default styles