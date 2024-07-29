import { DateConvert } from "../../services/common-view-function";
// create modify function used for modify fetching auctioneer open list data
export async function modifyAuctioneerOpenList(data) {
  var respData = { totalCount: 0, auctioneerOpenList: [] };
  if (data) {
    let auctionOpenList = data.response.resp;
    respData.totalCount = data.response.total;
    if (auctionOpenList && auctionOpenList.length > 0) {
      for (let i = 0; i < auctionOpenList.length; i++) {
        let subAuctionArr = [];
        let modObj = {};
        for (let j = 0; j < auctionOpenList[i].length; j++) {
          // check data id
          if (
            auctionOpenList[i][j].id == undefined ||
            auctionOpenList[i][j].id == null
          ) {
            modObj["id"] = "";
          } else {
            modObj["id"] = auctionOpenList[i][j].id;
          }
          // check data auctionfieldsvalueheaderid
          if (
            auctionOpenList[i][j].auctionfieldsvalueheaderid == undefined ||
            auctionOpenList[i][j].auctionfieldsvalueheaderid == null
          ) {
            modObj["auctionfieldsvalueheaderid"] = "";
          } else {
            modObj["auctionfieldsvalueheaderid"] =
              auctionOpenList[i][j].auctionfieldsvalueheaderid;
          }
          // check data entitytypeid
          if (
            auctionOpenList[i][j].entitytypeid == undefined ||
            auctionOpenList[i][j].entitytypeid == null
          ) {
            modObj["entitytypeid"] = "";
          } else {
            modObj["entitytypeid"] = auctionOpenList[i][j].entitytypeid;
          }
          // check data fieldvalue
          if (
            auctionOpenList[i][j].fieldvalue == undefined ||
            auctionOpenList[i][j].fieldvalue == null
          ) {
            modObj["fieldvalue"] = "";
          } else {
            modObj["fieldvalue"] = auctionOpenList[i][j].fieldvalue;
          }
          // check data primefield
          if (
            auctionOpenList[i][j].primefield == undefined ||
            auctionOpenList[i][j].primefield == null
          ) {
            modObj["primefield"] = "";
          } else {
            modObj["primefield"] = auctionOpenList[i][j].primefield;
          }
          // check data fielddesc
          if (
            auctionOpenList[i][j].fielddesc == undefined ||
            auctionOpenList[i][j].fielddesc == null
          ) {
            modObj["fielddesc"] = "";
          } else {
            modObj["fielddesc"] = auctionOpenList[i][j].fielddesc;
          }
          // check data fieldlabeldesc
          if (
            auctionOpenList[i][j].fieldlabeldesc == undefined ||
            auctionOpenList[i][j].fieldlabeldesc == null
          ) {
            modObj["fieldlabeldesc"] = "";
          } else {
            modObj["fieldlabeldesc"] = auctionOpenList[i][j].fieldlabeldesc;
          }
          // check data primefieldlable
          if (
            auctionOpenList[i][j].primefieldlable == undefined ||
            auctionOpenList[i][j].primefieldlable == null
          ) {
            modObj["primefieldlable"] = "";
          } else {
            modObj["primefieldlable"] = auctionOpenList[i][j].primefieldlable;
          }
          // check data primefieldtype
          if (
            auctionOpenList[i][j].primefieldtype == undefined ||
            auctionOpenList[i][j].primefieldtype == null
          ) {
            modObj["primefieldtype"] = "";
          } else {
            modObj["primefieldtype"] = auctionOpenList[i][j].primefieldtype;
          }
          // check data primevalue
          if (
            auctionOpenList[i][j].primevalue == undefined ||
            auctionOpenList[i][j].primevalue == null
          ) {
            modObj["primevalue"] = "";
          } else {
            modObj["primevalue"] = auctionOpenList[i][j].primevalue;
          }
          // check data fieldlabeldesc
          if (auctionOpenList[i][j].fieldlabeldesc == "Auction Start Date") {
            modObj["startDate"] = auctionOpenList[i][j].fieldvalue;
          }
          if (auctionOpenList[i][j].fieldlabeldesc == "Auction Start Time") {
            modObj["startTime"] = auctionOpenList[i][j].fieldvalue;
          }
          if (auctionOpenList[i][j].fieldlabeldesc == "Auction End Date") {
            modObj["endDate"] = auctionOpenList[i][j].fieldvalue;
          }
          if (auctionOpenList[i][j].fieldlabeldesc == "Auction End Time") {
            modObj["endtime"] = auctionOpenList[i][j].fieldvalue;
          }
        }
        subAuctionArr.push(modObj);
        modObj["index"] = i;
        modObj["check"] = false;
        modObj["tick"] = false;
        modObj["showHide"] = false;
        respData.auctioneerOpenList.push(modObj);
      }
    }
  }
  return respData;
}
