import axios from 'axios';
import { getData, multipleRemove } from '../../async-storage';
import { CryptoDecoder, CryptoEncoder } from '../../auth';
import { ApiConfigUrl } from "./";
import { CommonActions } from '@react-navigation/native';
import { storageDataModification } from '../../common-view-function';
import socketServices from './socketService';



export function ApiCall(uriName, payload, props) {
    return new Promise(async function (resolved, reject) {
        try {
            if (ApiConfigUrl.APP_LAST_URI[uriName].isAuth == true) {
                const token = await getData("auth");
                axios.interceptors.request.use(
                    config => {
                        if (config.headers.authorization === undefined) {
                            config.headers.authorization = `Bearer ` + token;
                        }
                        return config;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }

            if (ApiConfigUrl.APP_LAST_URI[uriName].method == "POST") {
                if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                    payload = { payload: CryptoEncoder.CryptoEncode(payload) }
                }
                axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                    .then(res => {
                        let response = res.data;
                        if (response.response == undefined || response.response == null) {

                        } else {
                            if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                                // response = CryptoDecoder.CryptoDecode(response);
                                response.response = CryptoDecoder.CryptoDecode(response.response);
                            }
                        }
                        resolved(response);
                    })
                    .catch(error => {
                        if (error.response) {
                            console.log("error", error.response.data.status)
                            if (error.response.data.status == 402 || error.response.data.status == 401) {
                                onLogOut(props)
                            }
                        }
                        // handle error
                        reject(error);
                    })
            } else if (ApiConfigUrl.APP_LAST_URI[uriName].method == "GET") {
                let uriPath = ApiConfigUrl.APP_LAST_URI[uriName].path;
                if (payload.queryParams) {
                    uriPath = uriPath + payload.queryParams;
                }
                axios.get(ApiConfigUrl.APP_LAST_URI[uriName].path)
                    .then(res => {
                        let response = res.data;
                        if (ApiConfigUrl.APP_LAST_URI[uriName].isEncrypt === true) {
                            response = CryptoDecoder.CryptoDecode(response);
                            // responseData.response = CryptoDecoder.CryptoDecode(responseData.response);
                        }
                        resolved(response);
                    })
                    .catch(error => {
                        // handle error
                        reject(error);
                    })
            }
        } catch (e) {
            reject(e);
        }
    })
}


export function ApiFileCall(uriName, payload) {
    return new Promise(async function (resolved, reject) {
        try {
            axios.post(ApiConfigUrl.APP_LAST_URI[uriName].path, payload)
                .then(res => {
                    let response = res.data;
                    resolved(response);
                })
                .catch(error => {
                    console.log(error)
                    // handle error
                    resolved(true);
                })
        } catch (e) {
            reject(e);
        }
    })
}

function wait() {
    new Promise((resolve) => { setTimeout(resolve, 4000) })
}

async function onLogOut(props) {
    socketServices.removeAllListeners();
    await multipleRemove([
        "auth",
        "userCredential",
        "headerData",
        ...storageDataModification.allStorageVariable,
    ]);
    // this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
    props.navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "LogInPage" }] })
    );
}