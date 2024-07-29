import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal as ReactNativeModal,
} from "react-native";
import { ImageName } from "../../enums";
import socketServices from "../../services/api/models/socketService";
import {
    getData,
    multipleRemove,
    storeData,
} from "../../services/async-storage";
import {
    storageDataModification,
    Toaster,
} from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import { LogOutModal } from "../../shared";
import { CustomStyle } from "../style";
import { modifyUserData } from "./function";
import styles from "./style";

// this is header page
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            menuModal: false,
            logOutModal: false,
            logOutModalLoader: false,
            userData: {},
            isSeen: false,
            allUserInfo: {},
        };
    }
    // this is initial function which is call first
    componentDidMount() {
        this._load();
    }
    // this is first function where set state data
    _load = async () => {
        let userCredential = await storageDataModification.userCredential(
            {},
            "get"
        );
        let modData = modifyUserData(userCredential);
        this.state.userData = modData;
        this.setState({
            userData: this.state.userData,
        });
        await this._getUserInfoFromApi();
    };
    // for fetching user info data from api call
    _getUserInfoFromApi = async () => {
        let headerData = await getData("headerData");
        if (headerData == null || headerData == undefined) {
            this.setState({ pageLoader: true });
        } else {
            // this.state.allUserInfo = headerData;
            if (headerData !== this.state.allUserInfo) {
                this.setState({ isSeen: false });
            } else {
                this.setState({ isSeen: true });
            }
            this.setState({
                pageLoader: false,
                // allUserInfo: this.state.allUserInfo
            });
        }
        let userData = await storageDataModification.userCredential({}, "get");
        let dataReq = {
            clientid: userData.clientid,
            templateid: 1,
            enttityid: userData.entityfieldmasterid,
            roleid: userData.roleId,
            entitytypeid: userData.entitytypeid,
        };
        let responseData = await MiddlewareCheck(
            "notificationList",
            dataReq,
            this.props
        );
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (
                    headerData == null ||
                    headerData == undefined ||
                    headerData !== responseData
                ) {
                    this.setState({ pageLoader: true });
                    this.state.allUserInfo = responseData;
                    this.props.stateUserInformation(responseData);
                    storeData("headerData", responseData);

                    this.setState({
                        pageLoader: false,
                        allUserInfo: this.state.allUserInfo,
                    });
                }
                this.getSeenNotification(responseData.response);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    };

    getSeenNotification = (arr) => {
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isread == 0) {
                    this.setState({ isSeen: false });
                } else {
                    this.setState({ isSeen: true });
                }
            }
        }
    };

    // for network errror
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    };

    _onProfile = () => {
        this.props.navigation.navigate("ProfilePage");
    };

    onOpenAndCloseMenuModal = () => {
        this.setState({
            menuModal: !this.state.menuModal,
        });
    };
    // for logout section
    logOutSection = () => {
        const _onLogOut = async () => {
            // this.setState({ logOutLoader: true });
            // let responseData = await MiddlewareCheck("vendorLogout", {});
            // if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            socketServices.removeAllListeners();
            await multipleRemove([
                "auth",
                "userCredential",
                "headerData",
                ...storageDataModification.allStorageVariable,
            ]);
            // this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
            this.props.navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: "LogInPage" }] })
            );
            // } else {
            //     Toaster.ShortCenterToaster(responseData.message);
            // }
            this.setState({ menuModal: false });
        };
        return (
            <LogOutModal
                isVisible={this.state.logOutModal}
                onCloseModal={() => this._onOpenAndCloseLogOutModal()}
                isLoading={this.state.logOutModalLoader}
                onLogout={() => _onLogOut()}
            />
        );
    };

    _onOpenAndCloseLogOutModal = () => {
        this.state.logOutModal = !this.state.logOutModal;
        this.setState({
            logOutModal: this.state.logOutModal,
        });
    };

    // socket.removeAllListeners();

    _onPressChangePassword = () => {
        this.onOpenAndCloseMenuModal();
        this.props.navigation.navigate("ChangePassword");
    };
    onNotificationClick = async () => {
        this.props.navigation.navigate("Notification");
        let reqData = {
            activityMasteid: [919, 915, 911, 907, 903, 899, 895, 891],
        };
        let responseData = await MiddlewareCheck(
            "updateNotificationRead",
            reqData,
            this.props
        );
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ isSeen: true });
            }
        }
    };
    // for design side menu section
    sideMenuSection = () => {
        return (
            <ReactNativeModal
                visible={this.state.menuModal}
                onRequestClose={() => this.onOpenAndCloseMenuModal()}
                transparent={true}
            >
                <View style={styles.menuModalMainView}>
                    <View style={{ marginHorizontal: "7%" }}>
                        <View style={styles.eachLineSection}>
                            <View style={styles.notiIconBackCircle}>
                                <TouchableOpacity
                                    style={styles.notificationSec}
                                    onPress={() => this._onOpenAndCloseLogOutModal()}
                                    activeOpacity={0.9}
                                >
                                    <Image
                                        source={ImageName.LOGOUT_ICON}
                                        style={styles.logoImg}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity
                                style={styles.auctionCrossTab}
                                activeOpacity={0.9}
                                onPress={() => this.onOpenAndCloseMenuModal()}
                            >
                                <Image
                                    source={ImageName.AUCTION_CROSS_IMG}
                                    style={styles.auctionCrossImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.changePassPressSec}
                            activeOpacity={0.9}
                            onPress={() => this._onPressChangePassword()}
                        >
                            <View style={styles.notSelectedView}>
                                <View style={styles.greyChangePassImgSec}>
                                    <Image
                                        source={ImageName.GRAY_CHANGE_PASSWORD}
                                        style={styles.greyChangePassImg}
                                    />
                                </View>
                                <View style={styles.changePassTxtSec}>
                                    <Text style={[styles.homeText, { color: "#706F83" }]}>
                                        Change Password
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        );
    };

    // this is main render to this page
    render() {
        return (
            <View style={styles.headerContainer}>
                {/* {this.state.pageLoader ?
                    null
                    :
                    <>
                        {this.modalAttendanceSection()}
                        {this.modalAttendanceSuccessSection()}
                        {this.sideMenuSection()}
                        {this.logOutSection()}
                    </>
                } */}
                {this.sideMenuSection()}
                {this.logOutSection()}
                <View style={styles.mainView}>
                    <>
                        <TouchableOpacity
                            style={styles.drawerIconSection}
                            activeOpacity={0.9}
                        // onPress={() => this._onPressDashboard()}
                        >
                            <Image
                                source={ImageName.AUCTION_LOGO}
                                style={styles.drawerIcon}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerMiddleSection}>
                            <Text style={CustomStyle.headerText}>
                                {this.state.userData.userfirstname +
                                    " " +
                                    this.state.userData.userlastname}
                            </Text>
                            <Text style={CustomStyle.headerSubText}>
                                {this.state.userData.rolename}
                            </Text>
                        </View>
                        <View style={styles.notiIconBackCircle}>
                            <TouchableOpacity
                                style={styles.notificationSec}
                                activeOpacity={0.9}
                                onPress={() => this.onNotificationClick()}
                            >
                                <View>
                                    {this.state.isSeen ? null : (
                                        <View style={styles.deepGreenCircel} />
                                    )}

                                    <Image
                                        source={ImageName.NOTIFICATION_GRAY}
                                        style={styles.logoImg}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.profileImgView}
                            activeOpacity={0.8}
                            onPress={() => this.onOpenAndCloseMenuModal()}
                        >
                            <Image
                                source={ImageName.BLUE_THREE_DOT}
                                style={styles.profileImg}
                            />
                        </TouchableOpacity>
                    </>
                </View>
            </View>
        );
    }
}

export default Header;
