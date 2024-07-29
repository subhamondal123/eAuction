import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
    View,
    Image
} from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, ImageName } from "../../enums";
import { getData } from "../../services/async-storage";
import { ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import styles from "./Style";
import { stateAllCountries, stateCheckForNetwork, stateUserInformation } from "../../redux/SRMBAuctionAction";
import { bindActionCreators } from "redux";
import { AppInfo } from "../../services/config";
import { Toaster, userWarning } from "../../services/common-view-function";
import { CryptoDecoder } from "../../services/auth";
// this is splash screen page 
class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            authCheck: false,
            versionData: {},
            authorizationCheck: true
        }
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        await this._load()
    }
    // this is first function where set state data
    _load = async () => {
        this.setState({ authorizationCheck: await userWarning.actionUnauthorizedDeviceWarning(this.props) });
        // await this._onGetAppVersionInfo();
        if (await getData("auth")) {
            this.setState({
                authCheck: true
            })
            this._onHideGoToNextPage()
        } else {
            this._onHideGoToNextPage()
        }
    }


    // for get the app version info
    _onGetAppVersionInfo = async () => {
        let responseData = await MiddlewareCheck("getCurrentAppVersionInfo", { "packageName": AppInfo.getAppPackageName() });
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ versionData: responseData.response })
                // if (responseData.response.version !== AppInfo.getCurrentAppVersion()) {
                //     if (responseData.response.isUpdate == 2) {
                //         this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable' }] }));
                //     } else if (responseData.response.isUpdate == 1) {
                //         Toaster.LongCenterToaster("A new update is available. You can update the apk.");
                //     }
                // }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onHideGoToNextPage = async () => {
        var that = this;
        that.myVar = setTimeout(function () {
            that._Hide_Splash_Screen();
        }, 1500);
    }
    // for hide splash screen
    _Hide_Splash_Screen = async () => {
        if (this.state.authCheck && this.state.authorizationCheck) {
            if (this.state.versionData.version !== AppInfo.getCurrentAppVersion()) {
                if (this.state.versionData.isUpdate == 2) {
                    this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable' }] }));
                } else {
                    if (this.state.versionData.isUpdate == 1) {
                        Toaster.LongCenterToaster("A new update is available. You can update the apk.");
                    }
                    if (this.state.authCheck) {
                        this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuctionDashboard' }] }))
                    } else {
                        this._onWelcome();
                    }
                }

            } else {
                if (this.state.authCheck) {
                    this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuctionDashboard' }] }))
                } else {
                    this._onWelcome();
                }
            }
        } else {
            this._onWelcome();
        }

        // if (this.state.authCheck) {
        //     this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuctionDashboard' }] }))
        // } else {
        //     this._onWelcome();
        // }
    }

    _onWelcome = () => {
        // if (this.state.versionData.version !== AppInfo.getCurrentAppVersion()) {
        //     if (this.state.versionData.isUpdate == 2) {
        //         this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable' }] }));
        //     } else if (this.state.versionData.isUpdate == 1) {
        //         Toaster.LongCenterToaster("A new update is available. You can update the apk.");
        //     } else {
        //         this.setState({
        //             isVisible: false
        //         })
        //     }
        // } else {
        this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogInPage' }] }));

        // }

    }

    // for network error 
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
        this.props.stateCheckForNetwork("SplashScreen");
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainSec}>
                    <View style={styles.subSec}>
                        <View style={styles.auctionLogoSec}>
                            <Image source={ImageName.AUCTION_LOGO} style={styles.auctionLogo} />
                        </View>

                    </View>
                </View>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { SRMBAuctionRedux } = state;
    return { SRMBAuctionRedux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        stateAllCountries,
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);