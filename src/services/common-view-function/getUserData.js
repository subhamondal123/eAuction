// This is for modify user data

import { LocationData } from ".";
import { getData } from "../async-storage";

export async function getUserData() {
    try {
        let userInfo = await getData("userCredential");
        let userObjData = {
            "clientid": userInfo.clientid == undefined || userInfo.clientid == null ? "" : userInfo.clientid.toString(),
            "userid": userInfo.id == undefined || userInfo.id == null ? "" : userInfo.id.toString(),
            "entityfieldmasterid": userInfo.entityfieldmasterid == undefined || userInfo.entityfieldmasterid == null ? "" : userInfo.entityfieldmasterid.toString(),
            "entitytypeid":userInfo.entitytypeid == undefined || userInfo.entitytypeid == null ? "" : userInfo.entitytypeid.toString(),
            "enttityid":userInfo.entityfieldmasterid == undefined || userInfo.entityfieldmasterid == null ? "" : userInfo.entityfieldmasterid.toString(),
            "userLoginId": userInfo.userloginid == undefined || userInfo.userloginid == null ? "" : userInfo.userloginid.toString(),
            "userMobile": userInfo.usermobile == undefined || userInfo.usermobile == null ? "" : userInfo.usermobile.toString(),
        };
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}


export async function getAllUserData() {
    try {
        let userInfo = await getData("userCredential");
        let userObjData = {
            "cmpId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "companyId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "createdBy": userInfo.userId == undefined || userInfo.userId == null ? "" : userInfo.userId.toString(),
            "clientId": userInfo.clientId == undefined || userInfo.clientId == null ? "" : userInfo.clientId.toString(),
            "userId": userInfo.vendorId == undefined || userInfo.vendorId == null ? "" : userInfo.vendorId.toString(),
            "vendorId": userInfo.vendorId == undefined || userInfo.vendorId == null ? "" : userInfo.vendorId.toString(),
            "userType": userInfo.userType == undefined || userInfo.userType == null ? "" : userInfo.userType.toString(),
            "usertypeId": userInfo.userTypeId == undefined || userInfo.userTypeId == null ? "" : userInfo.userTypeId.toString(),
            "countryId": userInfo.countryId == undefined || userInfo.countryId == null ? "" : userInfo.countryId.toString(),
            "stateId": userInfo.stateId == undefined || userInfo.stateId == null ? "" : userInfo.stateId.toString(),
            "districtId": userInfo.districtId == undefined || userInfo.districtId == null ? "" : userInfo.districtId.toString(),
            "zoneId": userInfo.zoneId == undefined || userInfo.zoneId == null ? "" : userInfo.zoneId.toString(),
        };
        return userObjData;
    } catch (err) {
        console.log(err)
    }
}

export async function getUserLocation() {
    try {
        let userLocation = await getData("userCredential");
        let currentLoc = await LocationData.fetchCurrentLocation();
        let userLocationData = {
            // "lattitude": "20.98",
            // "longitude": "89.71"
            "lattitude": currentLoc.latitude,
            "longitude": currentLoc.longitude
        };

        return userLocationData;
    } catch (err) {
        console.log(err)
    }
}