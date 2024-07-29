import { StyleSheet } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, Padding } from '../enums';


const globalStyle = StyleSheet.create({
    //define all global styles here
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1
    },

    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    noDataFoundViewForTabList: {
        marginTop: 10,
        height: Dimension.height,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        color: Color.COLOR.VIOLET.LAVENDER_INDIGO,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
        fontSize: FontSize.MD
    },
    headerSubText: {
        color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS
    },
    productBtn: {
        position: "absolute",
        bottom: "5%",
        alignSelf: 'center',
        width: "100%",
        marginHorizontal: "15%"
    },

    headerTextView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    backButtonView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerDataText: {
        fontSize: FontSize.LG,
        color: Color.COLOR.BLACK.BLACK_PEARL,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontWeight: "700"
    },


})

export { globalStyle as CustomStyle };