import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,

} from "react-native";
import { AlertMessage, Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import styles from "./Style";

import { BigTextButton, DropdownInputBox, Loader } from "../../shared";
import { CommonActions } from "@react-navigation/native";
import { storageDataModification, Toaster } from "../../services/common-view-function";
import { modifyArrRoleData } from "./Function";

// this is role login page 
class RoleLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roleData: [],
            roleSelectObj: {},


        };
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        this._load()
    }
    // this is first function where set state data 
    _load = async () => {
        let modifyRoleData = modifyArrRoleData(this.props.route.params.roleData);
        await storageDataModification.roleData(modifyRoleData, "store")
        this.state.roleData = modifyRoleData;
        this.setState({
            roleData: this.state.roleData
        })

        let userCredential = await storageDataModification.userCredential({}, "get");

    }

    _onSelectRoleSelect = (value) => {
        this.setState({ roleSelectObj: value });
    }


    _onGoButton = async () => {
        let errorCount = 0;
        if (this.state.roleSelectObj.roleid == null || this.state.roleSelectObj.roleid == undefined || this.state.roleSelectObj.roleid.length == 0) {
            Toaster.ShortCenterToaster("Please Choose Your role")
            errorCount++;
        } else {
            let userCredential = await storageDataModification.userCredential({}, "get");
            userCredential["roleId"] = this.state.roleSelectObj.roleid;
            userCredential["entitytypeid"] = this.state.roleSelectObj.entitytypeid;
            userCredential["rolename"] = this.state.roleSelectObj.rolename;
            await storageDataModification.userCredential(userCredential, "store");
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AuctionDashboard' }] }));
        }
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.loginSec}>
                            <Image source={ImageName.AUCTION_LOGO} style={styles.auctiuonImg} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.loginTxt}>Login</Text>
                                <Text style={styles.procedureTxt}>Procidure</Text>
                            </View>
                        </View>
                        <View style={styles.loginLogoSec}>
                            <Image source={ImageName.LOGIN_LOGO} style={styles.loginLogo} />
                        </View>
                        <View style={styles.inputSec}>
                            <View style={styles.formInputSection}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginTop: 10, marginLeft: '2%' }}>Choose Your Role</Text>

                                <View style={{ marginTop: 10 }}>
                                    <DropdownInputBox
                                        selectedValue={this.state.roleSelectObj.roleid ? this.state.roleSelectObj.roleid.toString() : "0"}
                                        data={this.state.roleData}
                                        onSelect={(value) => this._onSelectRoleSelect(value)}
                                        headerText={"Choose your role from here"}

                                    />
                                </View>

                                <View style={styles.buttonSection}>
                                    <BigTextButton
                                        height={50}
                                        borderRadius={15}
                                        backgroundColor={"#FFCC6A"}
                                        text={"GO"}
                                        fontColor={"#3D2F11"}
                                        onPress={() => this._onGoButton()}
                                    />
                                </View>

                                <Text style={styles.chooseLoginTxt}>Choose login by role</Text>
                                <Text style={styles.titleDesc}>If you forgot your password, click on the link above.you will get your password reset link at your mail address. </Text>
                            </View>
                            <View style={{ height: 200 }} />
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        )
    }
}



export default RoleLogIn;