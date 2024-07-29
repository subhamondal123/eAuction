// Define all the actions

export const setDeviceId = (deviceId) => ({
    type: "SET_DEVICEID",
    payload: deviceId,
});

export const stateCheckForNetwork = (networkCheckState) => ({
    type: "SET_STATE_CHECK_FOR_NETWORK",
    payload: networkCheckState,
});

export const stateAllCountries = (countryArr) => ({
    type: "SET_ALL_COUNTRIES",
    payload: countryArr,
});
export const stateUserInformation = (userInfo) => ({
    type: "SET_USER_INFORMATION",
    payload: userInfo,
});