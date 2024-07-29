//  get the user worning
import React, { BackHandler } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
import { AlertMessage } from "../../enums";
import { multipleRemove } from "../async-storage";
import { StorageDataModification, Toaster } from '.';
import JailMonkey from 'jail-monkey';

export function actionToLogoutWorning(props, event) {
    try {
        let alertAction = [];
        let alertBody = AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_WROING_USER;
        // if (props.ReraRedux.userActive === 1) {
        //     alertBody = AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_BODY;
        //     alertAction.push({
        //         text: "No",
        //         onPress: () => console.log("No Pressed"),
        //         style: "cancel"
        //     });
        // }
        alertAction.push({ text: "Yes", onPress: () => removeLoginData(props, event) });

        return Alert.alert(
            AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
            alertBody,
            alertAction
        );
    } catch (e) {
        console.log(e);
    }
}



export async function removeLoginData(props, event) {
    try {
        await StorageDataModification.removeLoginData();
        props.stateUserLoginType("");
        props.navigation.dispatch(event.data.action);
    } catch (e) {
        console.log(e);
    }
}


export async function actionUnauthorizedDeviceWarning(props) {
    try {
        if (JailMonkey.isJailBroken()) {
            Alert.alert(
                AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
                AlertMessage.MESSAGE.USER_WARNING.ROOT_DEVICE,
                [
                    { text: "Yes", onPress: () => BackHandler.exitApp() }
                ]
            );
            return false;
        }
        // else if (await JailMonkey.isDevelopmentSettingsMode()) {
        //     Alert.alert(
        //         AlertMessage.MESSAGE.USER_WARNING.ACTION_TO_LOGOUT_TITLE,
        //         AlertMessage.MESSAGE.USER_WARNING.ENABLE_DEVELOPER_MODE,
        //         [
        //             { text: "Yes", onPress: () => BackHandler.exitApp() }
        //         ]
        //     );
        //     return false;
        // }
        // else {
        return true;
        // }
    } catch (e) {
        console.log(e);
    }
}
