import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    ActivityIndicator
} from "react-native";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../redux/SRMBAuctionAction';
import { emailModValidator, modifyArrRoleData } from "./Function";
import { storeData } from "../../services/async-storage";
import { BigTextButton, Loader, Modal, TextInputBox } from "../../shared";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode, LengthValidate } from "../../services/constant";
import { DataValidator } from "../../validators";
import { CommonActions } from "@react-navigation/native";
import { GetUserData, storageDataModification, Toaster } from "../../services/common-view-function";
// import PushNotification from "react-native-push-notification";

// PushNotification.localNotification({
//     autoCancel: true,
//     bigText:
//       'This is local notification demo in React Native app. Only shown, when expanded.',
//     subText: 'Local Notification Demo',
//     title: 'Local Notification Title',
//     message: 'Expand me to see more',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     // actions: '["Yes", "No"]'
// })
// this is login page 
class LogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userIdActive: false,
            password: "",
            passwordActive: false,
            userIdError: false,
            passwordError: false,
            pageLoader: false,
            alertMessage: "",
            logInType: 0,
            fcmToken: "",
            passwordVisiable: true,
            roleData: [],
            roleSelectObj: {},

            logInpageShowHide: false,
            isUpdatePasswordVisible: false,
            passwordCheck: true,
            confirmPasswordCheck: true,
            updatePass: "",
            updatePassActive: false,
            updateConfirmPass: "",
            updateConfirmPassActive: false,
            updatePassLoader: false
        };
    }
    // this is initial function which is call first 
    componentDidMount = async () => {

        // this._getToken();
    }

    // get RCM token for push notification
    _getToken = () => {
        let that = this;

        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // return (token);
                that.setState({
                    fcmToken: token.token
                })
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                // console.log("NOTIFICATION:", notification);

                // process the notification
                const { foreground, userInteraction, title, message } = notification;
                if (foreground && (title || message) && !userInteraction) PushNotification.localNotification(notification);
                // (required) Called when a remote is received or opened, or local notification is opened
            },



            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                // console.log("ACTION:", notification.action);
                // console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },



            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });

        PushNotification.localNotification({
            ignoreInForeground: true
        })
    }

    // this is user is onChange function where set state user id value 
    _onChangeUserId = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.setState({
            userId: newText
        })

        if (this.state.userIdError == true) {
            this.setState({
                userIdError: false
            })
        }
    }
    // this is password onChange function where set state password value 
    _onChangePassword = (value) => {
        this.setState({
            password: value
        })

        if (this.state.passwordError == true) {
            this.setState({
                passwordError: false
            })
        }
    }

    _onForgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword");
    }

    _onCustomerLogin = () => {
        this.props.navigation.navigate("CustomerLogInPage")
    }

    _onClearLoginData = () => {
        this.setState({
            userId: "",
            password: ""
        })
    }
    _onPasswordVisiable = () => {
        this.setState({
            passwordVisiable: !this.state.passwordVisiable
        })
    }


    _onLoginType = async () => {
        if (this.state.logInType == 0) {
            this.state.logInType = 1;
            this.setState({
                logInType: this.state.logInType
            })
        } else {
            this.state.logInType = 0;
            this.setState({
                logInType: this.state.logInType
            })
        }
        await this._onClearLoginData()
    }

    _onUpdatePassword = (value) => {
        this.setState({ updatePass: value })
    }

    _onUpdateConfirmPassword = (value) => {
        this.setState({ updateConfirmPass: value })
    }

    _onLogin = async () => {
        this.state.userId = this.state.userId.replace(/\s+/g, '');
        let errorCount = 0;
        let msg = "";
        let data = {
            userId: this.state.userId,
            password: this.state.password
        }
        if (data.userId == null || data.userId == undefined || data.userId.length == 0) {
            msg = AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY;
            errorCount++;
        }
        // else if (emailModValidator(data.userId) == false) {
        //     msg = AlertMessage.MESSAGE.EMAIL_PASSWORD.INCORRECT;
        //     errorCount++;
        // }
        else if (data.password == null || data.password == undefined || data.password.length == 0) {
            msg = AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY;
            errorCount++;
        }
        this.setState({ alertMessage: msg })
        if (errorCount === 0) {
            this.setState({ alertMessage: "" });
            let reqData = {
                "username": this.state.userId,
                "password": this.state.password,
                // "platform": Platform.OS,
                // "deviceId": await DeviceInfo.DeviceUniqueId(),
                // "fcmToken": this.state.fcmToken,
                // "businessType": "",
                // "type": this.state.logInType
            }
            this.setState({ pageLoader: true })
            let responseData = await MiddlewareCheck("eAuctionLogin", reqData, this.props);
            console.log("eAuctionLogin,,,,",JSON.stringify(responseData))
            if (responseData == false) {
                this.setState({ alertMessage: "Network Error!" });
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    storeData("auth", responseData.response.token);
                    await storageDataModification.userCredential(responseData.response, "store");
                    this.setState({
                        logInpageShowHide: true
                    })

                    if (responseData.response.changepassword) {
                        this.setState({ isUpdatePasswordVisible: true })
                    } else {
                        await this._onRoleUserFetch()
                    }


                } else {
                    this.setState({ alertMessage: responseData.message });
                }
            }
            this.setState({ pageLoader: false })
        }

    }

    _eyeVisiable = (data) => {
        if (data == "PasswordNew") {
            this.state.passwordCheck = !this.state.passwordCheck;
        } else if (data == "ConfirmPass") {
            this.state.confirmPasswordCheck = !this.state.confirmPasswordCheck;
        } else { this.state.currentPasswordCheck = !this.state.currentPasswordCheck }

        this.setState({
            passwordCheck: this.state.passwordCheck,
            confirmPasswordCheck: this.state.confirmPasswordCheck,
            currentPasswordCheck: this.state.currentPasswordCheck
        })

    }

    _onUpdatePasswordApiCall = async () => {
        let userInfo = await storageDataModification.userCredential({}, "get");
        let reqData = {
            "id": userInfo.id,
            "newpassword": this.state.updatePass,
            "confirmpassword": this.state.updateConfirmPass,
            "clientid": userInfo.clientid,
            "userid": userInfo.id
        }
        this.setState({ updatePassLoader: true });
        let responseData = await MiddlewareCheck("update_passwordafterlogin", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ isUpdatePasswordVisible: false, updatePassLoader: false });
    }

    onOpenCloseUpdatePassModal = (type) => {
        this.setState({ isUpdatePasswordVisible: type });
    }

    updatePasswordModalSec = () => {
        return (
            <Modal
                isVisible={this.state.isUpdatePasswordVisible}
                onRequestClose={() => this.onOpenCloseUpdatePassModal(false)}
                // onBackdropPress={() => this.onOpenCloseUpdatePassModal(false)}
                onBackButtonPress={() => this.onOpenCloseUpdatePassModal(false)}
                children={
                    <View style={styles.modalview}>
                        <TouchableOpacity style={{ alignItems: 'flex-end', left: 5, top: 5 }} activeOpacity={0.9} onPress={() => this.onOpenCloseUpdatePassModal(false)}>
                            <Image source={ImageName.AUCTION_CROSS_IMG} style={{ resizeMode: 'contain', height: 15, width: 15 }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginTop: 15, marginBottom: 20 }}>
                            <View style={{ height: 15 }} />
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>Update Password</Text>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.newPassTxt}>New Password</Text> */}
                                <View style={styles.formInputBox}>
                                    <TextInputBox
                                        placeholder={"Enter New Password"}
                                        value={this.state.updatePass}
                                        onChangeText={(value) => this._onUpdatePassword(value)}
                                        secureTextEntry={this.state.passwordCheck}
                                        maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                        isRightIcon={true}
                                        keyboardType="default"
                                        rightIcon={this.state.passwordCheck ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                        onPressRightIcon={() => this._eyeVisiable("PasswordNew")}
                                        refName={ref => this.secondTextInput = ref}
                                        isActive={this.state.updatePassActive}
                                        onFocus={() => { this.setState({ updatePassActive: true }) }}
                                        onBlur={() => { this.setState({ updatePassActive: false }) }}
                                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.confirmPassTxt}>Confirm Password</Text> */}
                                <View style={styles.formInputBox}>
                                    <TextInputBox
                                        placeholder={"Enter Your Confirm Password"}
                                        value={this.state.updateConfirmPass}
                                        onChangeText={(value) => this._onUpdateConfirmPassword(value)}
                                        secureTextEntry={this.state.confirmPasswordCheck}
                                        maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                        isRightIcon={true}
                                        keyboardType="default"
                                        rightIcon={this.state.confirmPasswordCheck ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                        onPressRightIcon={() => this._eyeVisiable("ConfirmPass")}
                                        refName={ref => this.thirdTextInput = ref}
                                        isActive={this.state.updateConfirmPassActive}
                                        onFocus={() => { this.setState({ updateConfirmPassActive: true }) }}
                                        onBlur={() => { this.setState({ updateConfirmPassActive: false }) }}

                                    />

                                </View>
                            </View>
                            {this.state.updatePassLoader ?
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size="small" color={Color.COLOR.BLACK.PURE_BLACK} />
                                </View> :
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: Color.COLOR.RED.RED_ORANGE, width: 70, height: 40, borderRadius: 10, alignSelf: 'center', marginTop: 10 }} activeOpacity={0.9} onPress={() => this._onUpdatePasswordApiCall()}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} >Update</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        {/* {isLoading ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                <ActivityIndicator
                                    color={Color.COLOR.GRAY.GRAY_COLOR}
                                    size={'large'}
                                />
                            </View>
                            :
                            <View style={{ flexDirection: 'row', marginHorizontal: "5%", marginBottom: 20 }}>
                                <BigTextButton
                                    borderRadius={30}
                                    height={40}
                                    backgroundColor={Color.COLOR.GRAY.GRAY_TINTS}
                                    text={"Ok"}
                                    onPress={() => onOk()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    borderRadius={30}
                                    height={40}
                                    backgroundColor={Color.COLOR.RED.RED_ORANGE}
                                    text={"Cancel"}
                                    onPress={() => onCancelModal()}
                                />
                            </View>
                        } */}
                    </View>
                }

            />
        )
    }

    _onRoleUserFetch = async () => {
        let userData = await GetUserData.getUserData()
        let reqData = {
            "clientid": userData.clientid,
            "userid": userData.userid
        }

        this.setState({ pageLoader: true })
        let responseData = await MiddlewareCheck("roleLogin", reqData, this.props);
        // this.setState({ pageLoader: false })
        if (responseData == false) {
            this.setState({ alertMessage: "Network Error!" });
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifyRoleData = modifyArrRoleData(responseData.response);
                await storageDataModification.roleData(modifyRoleData, "store")
                this.state.roleData = modifyRoleData;
                this.setState({
                    roleData: this.state.roleData
                })
                if (this.state.logInpageShowHide == true && this.state.roleData.length > 1) {
                    this.props.navigation.navigate("RoleLogIn", { roleData: this.state.roleData })
                } else {
                    let userCredential = await storageDataModification.userCredential({}, "get");
                    userCredential["roleId"] = this.state.roleData[0].roleid;
                    userCredential["entitytypeid"] = this.state.roleData[0].entitytypeid;
                    userCredential["rolename"] = this.state.roleData[0].rolename;
                    await storageDataModification.userCredential(userCredential, "store");
                    this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuctionDashboard' }] }));
                }
            } else {
                this.setState({ alertMessage: responseData.message });
            }
            this.setState({
                pageLoader: false
            });
        }
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <>
                        {this.updatePasswordModalSec()}
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.loginProcedureSec}>
                                <Image source={ImageName.AUCTION_LOGO} style={styles.auctionLogo} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.loginTxt}>Login</Text>
                                    <Text style={styles.procedureTxt}>Procedure</Text>
                                </View>
                            </View>
                            <View style={styles.loginLogoSec}>
                                <Image source={ImageName.LOGIN_LOGO} style={styles.loginLogoImg} />
                            </View>

                            {/* {this.state.logInpageShowHide == false ? */}
                            <View style={styles.txtInputBoxSec}>
                                <View style={styles.formInputSection}>
                                    <Text style={styles.userIdTxt}>Your User ID</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <TextInputBox
                                            placeholder={"Enter your user ID here"}
                                            value={this.state.userId}
                                            onChangeText={(value) => this._onChangeUserId(value)}
                                            keyboardType={"default"}
                                            returnKeyType={"next"}
                                            blurOnSubmit={false}
                                            refName={ref => this.firstTextInput = ref}
                                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            isActive={this.state.userIdActive}
                                            borderRadius={14}
                                            onFocus={() => { this.setState({ userIdActive: true }) }}
                                            onBlur={() => { this.setState({ userIdActive: false }) }}
                                        />
                                    </View>
                                    <Text style={styles.passwordTxt}>Your Password</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <TextInputBox
                                            placeholder={"Password"}
                                            value={this.state.password}
                                            onChangeText={(value) => this._onChangePassword(value)}
                                            secureTextEntry={this.state.passwordVisiable}
                                            borderRadius={14}
                                            refName={ref => this.secondTextInput = ref}
                                            isActive={this.state.passwordActive}
                                            isRightIcon={true}
                                            rightIcon={this.state.passwordVisiable ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                            onPressRightIcon={() => this._onPasswordVisiable()}
                                            onFocus={() => { this.setState({ passwordActive: true }) }}
                                            onBlur={() => { this.setState({ passwordActive: false }) }}
                                        />
                                    </View>

                                    <Text style={styles.forgotPasswordTxt}>Forgot Password ? </Text>
                                    <Text style={styles.forgotPassTitleTxt}>If you forgot your password, click on the link above.you will get your password reset link at your mail address. </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        {this.state.alertMessage == "" ?
                                            null :
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={styles.alertMsg}>{this.state.alertMessage}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.buttonSection}>
                                        <TouchableOpacity
                                            style={{ backgroundColor: "#FFCC6A", justifyContent: "center", alignItems: "center", borderRadius: 15, paddingVertical: 15 }}
                                            onPress={() => this._onLogin()}>
                                            <Text style={{ color: "#3D2F11", fontFamily: FontFamily.FONTS.INTER.MEDIUM, fontSize: FontSize.MD }}>Login</Text>
                                        </TouchableOpacity>
                                        {/* <BigTextButton
                                        height={50}
                                        borderRadius={15}
                                        backgroundColor={"#FFCC6A"}
                                        text={"Login"}
                                        fontColor={"#3D2F11"}
                                        onPress={() => this._onLogin()}
                                    /> */}
                                    </View>

                                </View>
                                <View style={{ height: 50 }} />
                            </View>

                        </ScrollView>
                    </>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { SRMBAuctionRedux } = state
    return { SRMBAuctionRedux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);