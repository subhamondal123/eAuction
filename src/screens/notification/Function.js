import { DateConvert } from "../../services/common-view-function";

// for get index from list
export function getIndex(stateData, objData) {
    let index = 0;
    if (stateData) {
        for (let i = 0; i < stateData.length; i++) {
            if (stateData[i].id == objData.id) {
                index = i;
                break;
            }
        }
    }
    return index;
}


// for modify registration list data 
export function registrationlistModifyData(data) {
    var respData = { "totalCount": 0, "notificationList": [] };
    if (data) {
        let notificationListData = data.response;
        respData.totalCount = data.count;
        if (notificationListData && notificationListData.length > 0) {
            for (let i = 0; i < notificationListData.length; i++) {
                let modObj = {};
                // check data activitynotificationid
                if (notificationListData[i].activitynotificationid == undefined || notificationListData[i].activitynotificationid == null) {
                    modObj["activitynotificationid"] = "";
                } else {
                    modObj["activitynotificationid"] = notificationListData[i].activitynotificationid;
                }
                // check data id
                if (notificationListData[i].id == undefined || notificationListData[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = notificationListData[i].id;
                }
                // check data entityfieldmasterid
                if (notificationListData[i].entityfieldmasterid == undefined || notificationListData[i].entityfieldmasterid == null) {
                    modObj["entityfieldmasterid"] = "";
                } else {
                    modObj["entityfieldmasterid"] = notificationListData[i].entityfieldmasterid;
                }
                // check data auctionroleid
                if (notificationListData[i].auctionroleid == undefined || notificationListData[i].auctionroleid == null) {
                    modObj["auctionroleid"] = "";
                } else {
                    modObj["auctionroleid"] = notificationListData[i].auctionroleid;
                }
                // check data isread
                if (notificationListData[i].isread == undefined || notificationListData[i].isread == null) {
                    modObj["isread"] = "";
                } else {
                    modObj["isread"] = notificationListData[i].isread;
                }
                // check data time
                if (notificationListData[i].time == undefined || notificationListData[i].time == null) {
                    modObj["time"] = "";
                } else {
                    modObj["time"] = DateConvert.formatYYYYMMDDHHMM(notificationListData[i].time);
                }
                // check data roleid
                if (notificationListData[i].roleid == undefined || notificationListData[i].roleid == null) {
                    modObj["roleid"] = "";
                } else {
                    modObj["roleid"] = notificationListData[i].roleid;
                }
                // check data activitylog
                if (notificationListData[i].activitylog == undefined || notificationListData[i].activitylog == null) {
                    modObj["activitylog"] = "";
                } else {
                    modObj["activitylog"] = notificationListData[i].activitylog;
                }
                // check data activityname
                if (notificationListData[i].activityname == undefined || notificationListData[i].activityname == null) {
                    modObj["activityname"] = "";
                } else {
                    modObj["activityname"] = notificationListData[i].activityname;
                }
                // check data rolename
                if (notificationListData[i].rolename == undefined || notificationListData[i].rolename == null) {
                    modObj["rolename"] = "";
                } else {
                    modObj["rolename"] = notificationListData[i].rolename;
                }
                // check data userfirstname
                if (notificationListData[i].userfirstname == undefined || notificationListData[i].userfirstname == null) {
                    modObj["userfirstname"] = "";
                } else {
                    modObj["userfirstname"] = notificationListData[i].userfirstname;
                }
                // check data userlastname
                if (notificationListData[i].userlastname == undefined || notificationListData[i].userlastname == null) {
                    modObj["userlastname"] = "";
                } else {
                    modObj["userlastname"] = notificationListData[i].userlastname;
                }
                // check data primarykeyvalue
                if (notificationListData[i].primarykeyvalue == undefined || notificationListData[i].primarykeyvalue == null) {
                    modObj["primarykeyvalue"] = "";
                } else {
                    modObj["primarykeyvalue"] = notificationListData[i].primarykeyvalue;
                }
                respData.notificationList.push(modObj);

            }
        }
    }
    return (respData);
}