import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { APP_INDEX } from "../../../globalConstant";
import { ApiConfigUrl, ApiModule } from "../api";
import socketServices from "../api/models/socketService";
import { getData, multipleRemove } from "../async-storage";
import { CryptoDecoder, CryptoEncoder } from "../auth";
import { GetUserData, Toaster, userWarning } from "../common-view-function";
// import { Encoder } from "../auth";
import { AppInfo, DeviceInfo } from "../config";


export function MiddlewareCheck(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (await userWarning.actionUnauthorizedDeviceWarning(props)) {

                if (await DeviceInfo.CheckConnection()) {
                    // const encodeData = Encoder.encode(payload);
                    payload = {
                        platform: Platform.OS,
                        ...payload
                    }
                    let userInfo = await getData("userCredential");
                    if (userInfo) {
                        payload = {
                            ...payload,
                            ...await GetUserData.getUserData()
                        }
                    }
                    if (ApiConfigUrl.APP_LAST_URI[uriName].isPicLocation == true) {
                        payload = {
                            ...payload,
                            ...await GetUserData.getUserLocation()
                        }
                    }
                    // if (props) {
                    //     if (await GetVersionCheck(props)) {
                    //         let userStatus = await ApiModule.ApiCall("getUserStatus", payload);
                    //         if (userStatus.data.status == 1) {
                    //             await multipleRemove(["auth", "userCredential","headerData" ]);
                    //             // props.stateUserInformation({});
                    //             props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
                    //         } else {
                    //             resolved(await ApiModule.ApiCall(uriName, payload));
                    //         }
                    //     }
                    // } else {
                    resolved(await ApiModule.ApiCall(uriName, payload,props));
                    // }
                } else {
                    if (props) {
                        props.navigation.navigate("NetworkError");
                    }
                    resolved(false)
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}

async function GetVersionCheck(props) {
    let versionCheck = true;
    let appVersion = await ApiModule.ApiCall("getCurrentAppVersionInfo", { "packageName": AppInfo.getAppPackageName(), "appIndex": APP_INDEX });
    if (appVersion.data.version !== AppInfo.getCurrentAppVersion()) {
        if (appVersion.data.isUpdate == 2) {
            versionCheck = false;
            props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable', "data": appVersion.data }] }));
        } else if (appVersion.data.isUpdate == 1) {
            Toaster.LongCenterToaster("A new update is available. You can update the apk.");
        }
    }
    return versionCheck;
}


export function MiddlewareFileCheck(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (await DeviceInfo.CheckConnection()) {
                const formData = new FormData();
                formData.append(
                    "file",
                    payload
                );
                if (props) {
                    let userStatus = await ApiModule.ApiCall("getUserStatus", payload);
                    if (userStatus.data.status == 1) {
                        await multipleRemove(["auth", "userCredential", "headerData"]);
                        props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
                    } else {
                        resolved(await ApiModule.ApiFileCall(uriName, formData));
                    }
                } else {
                    resolved(await ApiModule.ApiFileCall(uriName, formData));
                }
            } else {
                resolved(false)
            }
        } catch (e) {
            reject(e);
        }
    });
}


export function MiddlewareSocketOnCheck(eventName, props) {
    return new Promise(async function (resolved, reject) {
        try {
            socketServices.on(eventName,
                (data) => {
                    data.response = CryptoDecoder.CryptoDecode(data.response);
                    resolved(data);
                }
            )
        } catch (e) {
            reject(e);
        }
    })
}


export function MiddlewareSocketEmitCheck(eventName, payload, props) {
    try {
        if (props) {
            let encryptedPayload = { payload: CryptoEncoder.CryptoEncode(payload) }
            socketServices.emit(eventName, encryptedPayload)
        } else {
            return data;
        }

    } catch (e) {
        return null;
    }
}