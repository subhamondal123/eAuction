import React from "react";
import { AlertMessage, Color, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    stateCheckForNetwork,
    stateUserInformation
} from '../../redux/SRMBAuctionAction';
import { ErrorCode, LengthValidate } from '../../services/constant';
import { validationCheck } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getData, multipleRemove } from "../../services/async-storage";
import { BigTextButton, Loader, TextInputBox } from "../../shared";
import { MiddlewareCheck } from "../../services/middleware";
import { apiErrorResponseValidator, apiSuccessResponseValidator } from "../../services/Validators/apiResponseController";
import { CommonActions } from "@react-navigation/native";
import { storageDataModification, Toaster } from "../../services/common-view-function";

// this is change password page 
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            password: "",
            confirmPassword: "",
            currentPassActive: false,
            passActive: false,
            confirmActive: false,
            passwordCheck: true,
            confirmPasswordCheck: true,
            currentPasswordCheck: true,
            passError: false,
            confirmPassError: false,
            currentPassError: false,
            userCredential: {},
            pageLoader: false,

        }
    }
    // this is initial function which is call first 
    componentDidMount() {

        this._load();
    }

    // this is first function where set state data 
    _load = async () => {
        let userdata = await getData("userCredential");
        this.setState({
            userCredential: userdata
        })

    }

    // this is current password onChange function where set state current password value 
    _onCurrentPassword = (value) => {
        this.setState({
            currentPassword: value
        })
    }
    // this is password onChange function where set state password value 
    _onPassword = (value) => {
        this.setState({
            password: value

        })
    }
    // this is confirm password onChange function where set state confirm password value 
    _onConfirmassword = (value) => {
        this.setState({
            confirmPassword: value

        })
    }
    // for navigate to previous screen
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // for visible password 
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
    // for save password 
    _onSavePassword = async () => {
        let userData = await storageDataModification.userCredential({}, "get");
        let data = {
            currentPassword: this.state.currentPassword,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        let validPass = validationCheck(data)
        if (validPass.status == true) {
            let reqData = {
                "oldpassword": this.state.currentPassword,
                "newpassword": this.state.confirmPassword,
                "userid": userData.id,
                "clientid": userData.clientid
            }
            this.setState({ pageLoader: true });
            let responseData = await MiddlewareCheck("changePassword", reqData, this.props)
            console.log("changePassword----:::", JSON.stringify(responseData));
            if (responseData.status === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await multipleRemove(["auth", "userCredential"]);
                apiSuccessResponseValidator(responseData);
                Toaster.ShortCenterToaster(responseData.message)
                this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogInPage' }] }));
            } else {
                apiErrorResponseValidator(responseData)
            }
        } else {
            this.setState(validPass.stateObj);
        }
        this.setState({ pageLoader: false });

    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    : <React.Fragment>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.backImgTab}>
                                <TouchableOpacity style={{}} onPress={() => this._onBack()} activeOpacity={0.9}>
                                    <Image source={ImageName.BACK_LOGO} style={styles.backLogo} />
                                </TouchableOpacity>
                                <View style={styles.changePassSec}>
                                    <Image source={ImageName.AUCTION_LOGO} style={styles.auctionLogo} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.changePassTxt}>Change Password</Text>
                                        {/* <Text style={{ color: '#A0A2B5', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.LIGHT, top: -6 }}>Procidure</Text> */}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.loginLogoSec}>
                                <Image source={ImageName.LOGIN_LOGO} style={styles.loginLogo} />
                            </View>

                            <View style={styles.inputSec}>
                                <View style={styles.formInputSection}>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.currentPassTxt}>Current Password</Text>
                                        <View style={styles.formInputBox}>
                                            <TextInputBox
                                                placeholder={"Enter Your Current Password"}
                                                value={this.state.currentPassword}
                                                onChangeText={(value) => this._onCurrentPassword(value)}
                                                secureTextEntry={this.state.currentPasswordCheck}
                                                maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                                isRightIcon={true}
                                                keyboardType="default"
                                                rightIcon={this.state.currentPasswordCheck ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                                onPressRightIcon={() => this._eyeVisiable("CurrentPass")}
                                                refName={ref => this.firstTextInput = ref}
                                                isActive={this.state.currentPassActive}
                                                onFocus={() => { this.setState({ currentPassActive: true }) }}
                                                onBlur={() => { this.setState({ currentPassActive: false }) }}
                                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 1 }}>
                                            <Text style={styles.newPassTxt}>New Password</Text>
                                            <View style={styles.formInputBox}>
                                                <TextInputBox
                                                    placeholder={"Enter New Password"}
                                                    value={this.state.password}
                                                    onChangeText={(value) => this._onPassword(value)}
                                                    secureTextEntry={this.state.passwordCheck}
                                                    maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                                    isRightIcon={true}
                                                    keyboardType="default"
                                                    rightIcon={this.state.passwordCheck ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                                    onPressRightIcon={() => this._eyeVisiable("PasswordNew")}
                                                    refName={ref => this.secondTextInput = ref}
                                                    isActive={this.state.passActive}
                                                    onFocus={() => { this.setState({ passActive: true }) }}
                                                    onBlur={() => { this.setState({ passActive: false }) }}
                                                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                                    returnKeyType="next"
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 15 }}>
                                            <Text style={styles.confirmPassTxt}>Confirm Password</Text>
                                            <View style={styles.formInputBox}>
                                                <TextInputBox
                                                    placeholder={"Enter Your Confirm Password"}
                                                    value={this.state.confirmPassword}
                                                    onChangeText={(value) => this._onConfirmassword(value)}
                                                    secureTextEntry={this.state.confirmPasswordCheck}
                                                    maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                                    isRightIcon={true}
                                                    keyboardType="default"
                                                    rightIcon={this.state.confirmPasswordCheck ? ImageName.EYE_SLASH_LOGO : ImageName.OPEN_EYE}
                                                    onPressRightIcon={() => this._eyeVisiable("ConfirmPass")}
                                                    refName={ref => this.thirdTextInput = ref}
                                                    isActive={this.state.confirmActive}
                                                    onFocus={() => { this.setState({ confirmActive: true }) }}
                                                    onBlur={() => { this.setState({ confirmActive: false }) }}

                                                />

                                            </View>
                                        </View>
                                        <View style={styles.buttonSection}>
                                            <BigTextButton
                                                height={50}
                                                borderRadius={15}
                                                backgroundColor={"#FFCC6A"}
                                                text={"Save"}
                                                fontColor={"#3D2F11"}
                                                onPress={() => this._onSavePassword()}
                                            />

                                        </View>
                                        <View style={{ marginBottom: 50 }} />
                                    </View>
                                </View>
                                <View style={{ height: 50 }} />
                            </View>

                        </ScrollView>
                    </React.Fragment>}

            </SafeAreaView>
        )
    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);