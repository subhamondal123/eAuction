import { DateConvert } from "../../services/common-view-function";
// create modify function used for modify fetching  auctioneer live list data  
export async function modifyAuctioneerLiveList(data) {
    var respData = { "totalCount": 0, "auctioneerLiveList": [] };
    if (data) {
        let auctionList = data.response.resp;
        respData.totalCount = data.response.total;
        if (auctionList && auctionList.length > 0) {
            for (let i = 0; i < auctionList.length; i++) {
                let subAuctionArr = [];
                let modObj = {};
                for (let j = 0; j < auctionList[i].length; j++) {
                    // check data id
                    if (auctionList[i][j].id == undefined || auctionList[i][j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = auctionList[i][j].id;
                    }
                    // check data auctionfieldsvalueheaderid
                    if (auctionList[i][j].auctionfieldsvalueheaderid == undefined || auctionList[i][j].auctionfieldsvalueheaderid == null) {
                        modObj["auctionfieldsvalueheaderid"] = "";
                    } else {
                        modObj["auctionfieldsvalueheaderid"] = auctionList[i][j].auctionfieldsvalueheaderid;
                    }
                    // check data entitytypeid
                    if (auctionList[i][j].entitytypeid == undefined || auctionList[i][j].entitytypeid == null) {
                        modObj["entitytypeid"] = "";
                    } else {
                        modObj["entitytypeid"] = auctionList[i][j].entitytypeid;
                    }
                    // check data fieldvalue
                    if (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null) {
                        modObj["fieldvalue"] = "";
                    } else {
                        modObj["fieldvalue"] = auctionList[i][j].fieldvalue;
                    }
                    // check data primefield
                    if (auctionList[i][j].primefield == undefined || auctionList[i][j].primefield == null) {
                        modObj["primefield"] = "";
                    } else {
                        modObj["primefield"] = auctionList[i][j].primefield;
                    }
                    // check data fielddesc
                    if (auctionList[i][j].fielddesc == undefined || auctionList[i][j].fielddesc == null) {
                        modObj["fielddesc"] = "";
                    } else {
                        modObj["fielddesc"] = auctionList[i][j].fielddesc;
                    }
                    // check data fieldlabeldesc
                    if (auctionList[i][j].fieldlabeldesc == undefined || auctionList[i][j].fieldlabeldesc == null) {
                        modObj["fieldlabeldesc"] = "";
                    } else {
                        modObj["fieldlabeldesc"] = auctionList[i][j].fieldlabeldesc;
                    }
                    // check data primefieldlable
                    if (auctionList[i][j].primefieldlable == undefined || auctionList[i][j].primefieldlable == null) {
                        modObj["primefieldlable"] = "";
                    } else {
                        modObj["primefieldlable"] = auctionList[i][j].primefieldlable;
                    }
                    // check data primefieldtype
                    if (auctionList[i][j].primefieldtype == undefined || auctionList[i][j].primefieldtype == null) {
                        modObj["primefieldtype"] = "";
                    } else {
                        modObj["primefieldtype"] = auctionList[i][j].primefieldtype;
                    }
                    // check data primevalue
                    if (auctionList[i][j].primevalue == undefined || auctionList[i][j].primevalue == null) {
                        modObj["primevalue"] = "";
                    } else {
                        modObj["primevalue"] = auctionList[i][j].primevalue;
                    }
                    // check data fieldlabeldesc
                    if (auctionList[i][j].fieldlabeldesc == "Auction Start Date") {
                        modObj["startDate"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Auction Start Time") {
                        modObj["startTime"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Auction End Date") {
                        modObj["endDate"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Auction End Time") {
                        modObj["endtime"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Auction Start Date & Time") {
                        modObj["actualStartDateTime"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Auction End Date & Time") {
                        modObj["auctionEndTime"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fieldlabeldesc == "Actual Auction End Date & Time") {
                        modObj["actualEndDateTime"] = auctionList[i][j].fieldvalue;
                    }
                }
                subAuctionArr.push(modObj)
                modObj["index"] = i;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.auctioneerLiveList.push(modObj);
            }
        }
    }
    return (respData);
}


