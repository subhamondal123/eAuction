// create a modify function used for modify auctioneer live list details data
export async function modifyAuctioneerLiveListDetails(data) {
  var respData = { auctioneerLiveList: [] };
  if (data) {
    let auctioneerListDetails = data.response;
    if (auctioneerListDetails && auctioneerListDetails.length > 0) {
      let modObj = {};
      for (let i = 0; i < auctioneerListDetails.length; i++) {
        // check data auctionfieldsvalueheaderid
        if (
          auctioneerListDetails[i].auctionfieldsvalueheaderid == undefined ||
          auctioneerListDetails[i].auctionfieldsvalueheaderid == null
        ) {
          modObj["auctionfieldsvalueheaderid"] = "";
        } else {
          modObj["auctionfieldsvalueheaderid"] =
            auctioneerListDetails[i].auctionfieldsvalueheaderid;
        }
        // check data creatorrole
        if (
          auctioneerListDetails[i].creatorrole == undefined ||
          auctioneerListDetails[i].creatorrole == null
        ) {
          modObj["creatorrole"] = "";
        } else {
          modObj["creatorrole"] = auctioneerListDetails[i].creatorrole;
        }
        // check data entitytypeid
        if (
          auctioneerListDetails[i].entitytypeid == undefined ||
          auctioneerListDetails[i].entitytypeid == null
        ) {
          modObj["entitytypeid"] = "";
        } else {
          modObj["entitytypeid"] = auctioneerListDetails[i].entitytypeid;
        }
        // check data primefielddesc
        if (
          auctioneerListDetails[i].primefielddesc == undefined ||
          auctioneerListDetails[i].primefielddesc == null
        ) {
          modObj["primefielddesc"] = "";
        } else {
          modObj["primefielddesc"] = auctioneerListDetails[i].primefielddesc;
        }
        // check data fielddesc
        if (
          auctioneerListDetails[i].fielddesc == undefined ||
          auctioneerListDetails[i].fielddesc == null
        ) {
          modObj["fielddesc"] = "";
        } else {
          modObj["fielddesc"] = auctioneerListDetails[i].fielddesc;
        }
        // check data fieldid
        if (
          auctioneerListDetails[i].fieldid == undefined ||
          auctioneerListDetails[i].fieldid == null
        ) {
          modObj["fieldid"] = "";
        } else {
          modObj["fieldid"] = auctioneerListDetails[i].fieldid;
        }
        // check data fieldlabeldesc
        if (
          auctioneerListDetails[i].fieldlabeldesc == undefined ||
          auctioneerListDetails[i].fieldlabeldesc == null
        ) {
          modObj["fieldlabeldesc"] = "";
        } else {
          modObj["fieldlabeldesc"] = auctioneerListDetails[i].fieldlabeldesc;
        }
        // check data fieldtype
        if (
          auctioneerListDetails[i].fieldtype == undefined ||
          auctioneerListDetails[i].fieldtype == null
        ) {
          modObj["fieldtype"] = "";
        } else {
          modObj["fieldtype"] = auctioneerListDetails[i].fieldtype;
        }
        // check data fieldvalue
        if (
          auctioneerListDetails[i].fieldvalue == undefined ||
          auctioneerListDetails[i].fieldvalue == null
        ) {
          modObj["fieldvalue"] = "";
        } else {
          modObj["fieldvalue"] = auctioneerListDetails[i].fieldvalue;
        }
        // check data id
        if (
          auctioneerListDetails[i].id == undefined ||
          auctioneerListDetails[i].id == null
        ) {
          modObj["id"] = "";
        } else {
          modObj["id"] = auctioneerListDetails[i].id;
        }
        // check data id
        if (
          auctioneerListDetails[i].id == undefined ||
          auctioneerListDetails[i].id == null
        ) {
          modObj["id"] = "";
        } else {
          modObj["id"] = auctioneerListDetails[i].id;
        }
        // check data primefield
        if (
          auctioneerListDetails[i].primefield == undefined ||
          auctioneerListDetails[i].primefield == null
        ) {
          modObj["primefield"] = "";
        } else {
          modObj["primefield"] = auctioneerListDetails[i].primefield;
        }
        // check data primefieldlable
        if (
          auctioneerListDetails[i].primefieldlable == undefined ||
          auctioneerListDetails[i].primefieldlable == null
        ) {
          modObj["primefieldlable"] = "";
        } else {
          modObj["primefieldlable"] = auctioneerListDetails[i].primefieldlable;
        }
        // check data primefieldtype
        if (
          auctioneerListDetails[i].primefieldtype == undefined ||
          auctioneerListDetails[i].primefieldtype == null
        ) {
          modObj["primefieldtype"] = "";
        } else {
          modObj["primefieldtype"] = auctioneerListDetails[i].primefieldtype;
        }
        // check data primevalue
        if (
          auctioneerListDetails[i].primevalue == undefined ||
          auctioneerListDetails[i].primevalue == null
        ) {
          modObj["primevalue"] = "";
        } else {
          modObj["primevalue"] = auctioneerListDetails[i].primevalue;
        }

        // check data fieldlabeldesc
        if (auctioneerListDetails[i].fieldlabeldesc == "Auction Start Date") {
          modObj["startDate"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fieldlabeldesc == "Auction Start Time") {
          modObj["startTime"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fieldlabeldesc == "Auction End Date") {
          modObj["endDate"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fieldlabeldesc == "Auction End Time") {
          modObj["endtime"] = auctioneerListDetails[i].fieldvalue;
        }
        if (
          auctioneerListDetails[i].fieldlabeldesc ==
          "Actual Auction End Date & Time"
        ) {
          modObj["actualEndTime"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fieldlabeldesc == "Delivery Instruction") {
          modObj["deliveryIns"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fielddesc == "auctiondescfile") {
          modObj["auctionDescFile"] = auctioneerListDetails[i].fieldvalue;
        }
        if (auctioneerListDetails[i].fieldlabeldesc == "Auction Description") {
          modObj["auctionDes"] = auctioneerListDetails[i].fieldvalue;
        }
      }
      respData.auctioneerLiveList.push(modObj);
    }
  }
  return respData;
}

// for modify product details data
export async function modifyProductDetails(data) {
  var respData = { productDetails: [] };
  if (data) {
    let auctionList = data.response;
    if (auctionList && auctionList.length > 0) {
      for (let i = 0; i < auctionList.length; i++) {
        let subAuctionArr = [];
        let modObj = {};
        for (let j = 0; j < auctionList[i].length; j++) {
          // check data id
          if (
            auctionList[i][j].id == undefined ||
            auctionList[i][j].id == null
          ) {
            modObj["id"] = "";
          } else {
            modObj["id"] = auctionList[i][j].id;
          }
          // check data productid
          if (
            auctionList[i][j].productid == undefined ||
            auctionList[i][j].productid == null
          ) {
            modObj["productid"] = "";
          } else {
            modObj["productid"] = auctionList[i][j].productid;
          }
          // check data productdesc
          if (
            auctionList[i][j].productdesc == undefined ||
            auctionList[i][j].productdesc == null
          ) {
            modObj["productdesc"] = "";
          } else {
            modObj["productdesc"] = auctionList[i][j].productdesc;
          }
          // check data gst
          if (
            auctionList[i][j].gst == undefined ||
            auctionList[i][j].gst == null
          ) {
            modObj["gst"] = "";
          } else {
            modObj["gst"] = auctionList[i][j].gst;
          }
          // check data unitdesc
          if (
            auctionList[i][j].unitdesc == undefined ||
            auctionList[i][j].unitdesc == null
          ) {
            modObj["unitdesc"] = "";
          } else {
            modObj["unitdesc"] = auctionList[i][j].unitdesc;
          }
          // check data fieldid
          if (
            auctionList[i][j].fieldid == undefined ||
            auctionList[i][j].fieldid == null
          ) {
            modObj["fieldid"] = "";
          } else {
            modObj["fieldid"] = auctionList[i][j].fieldid;
          }
          // check data isrequired
          if (
            auctionList[i][j].isrequired == undefined ||
            auctionList[i][j].isrequired == null
          ) {
            modObj["isrequired"] = "";
          } else {
            modObj["isrequired"] = auctionList[i][j].isrequired;
          }
          // check data permission
          if (
            auctionList[i][j].permission == undefined ||
            auctionList[i][j].permission == null
          ) {
            modObj["permission"] = "";
          } else {
            modObj["permission"] = auctionList[i][j].permission;
          }
          // check data isDetailedView
          if (
            auctionList[i][j].isDetailedView == undefined ||
            auctionList[i][j].isDetailedView == null
          ) {
            modObj["isDetailedView"] = "";
          } else {
            modObj["isDetailedView"] = auctionList[i][j].isDetailedView;
          }

          // check data fieldlabeldesc
          if (auctionList[i][j].fieldlabeldesc == "Quantity Required") {
            modObj["quantityReq"] = auctionList[i][j].fieldvalue;
          }
          if (auctionList[i][j].fieldlabeldesc == "Base Price") {
            modObj["basePrice"] = auctionList[i][j].fieldvalue;
          }
          if (auctionList[i][j].fieldlabeldesc == "Auction Delivery Date") {
            modObj["deliveryDate"] = auctionList[i][j].fieldvalue;
          }
          if (auctionList[i][j].fieldlabeldesc == "Auction Tick Size (%)") {
            modObj["auctionticksize"] = auctionList[i][j].fieldvalue;
          }
        }
        subAuctionArr.push(modObj);
        modObj["index"] = i;
        modObj["check"] = false;
        modObj["tick"] = false;
        modObj["showHide"] = false;
        respData.productDetails.push(modObj);
      }
    }
  }
  return respData;
}
// for modify vendor details data
export async function modifyVendorDetails(data) {
  var respData = { vendorListDetails: [] };
  if (data) {
    let vendorDetails = data.response;
    if (vendorDetails && vendorDetails.length > 0) {
      for (let i = 0; i < vendorDetails.length; i++) {
        let modObj = {};
        // check data auctionfieldsvalueheaderid
        if (
          vendorDetails[i].auctionfieldsvalueheaderid == undefined ||
          vendorDetails[i].auctionfieldsvalueheaderid == null
        ) {
          modObj["auctionfieldsvalueheaderid"] = "";
        } else {
          modObj["auctionfieldsvalueheaderid"] =
            vendorDetails[i].auctionfieldsvalueheaderid;
        }
        // check data entityfieldmasterid
        if (
          vendorDetails[i].entityfieldmasterid == undefined ||
          vendorDetails[i].entityfieldmasterid == null
        ) {
          modObj["entityfieldmasterid"] = "";
        } else {
          modObj["entityfieldmasterid"] = vendorDetails[i].entityfieldmasterid;
        }
        // check data primarykeyvalue
        if (
          vendorDetails[i].primarykeyvalue == undefined ||
          vendorDetails[i].primarykeyvalue == null
        ) {
          modObj["primarykeyvalue"] = "";
        } else {
          modObj["primarykeyvalue"] = vendorDetails[i].primarykeyvalue;
        }
        modObj["index"] = i;
        respData.vendorListDetails.push(modObj);
      }
    }
  }
  return respData;
}
// for modify category details data
export async function modifyCategoryDetails(data) {
  var respData = { categoryDetails: [] };
  if (data) {
    let categoryDetails = data.response;
    if (categoryDetails && categoryDetails.length > 0) {
      let modObj = {};
      for (let i = 0; i < categoryDetails.length; i++) {
        // check data auctionid
        if (
          categoryDetails[i].auctionid == undefined ||
          categoryDetails[i].auctionid == null
        ) {
          modObj["auctionid"] = "";
        } else {
          modObj["auctionid"] = categoryDetails[i].auctionid;
        }
        // check data auctionval
        if (
          categoryDetails[i].auctionval == undefined ||
          categoryDetails[i].auctionval == null
        ) {
          modObj["auctionval"] = "";
        } else {
          modObj["auctionval"] = categoryDetails[i].auctionval;
        }
        // check data auctionvalid
        if (
          categoryDetails[i].auctionvalid == undefined ||
          categoryDetails[i].auctionvalid == null
        ) {
          modObj["auctionvalid"] = "";
        } else {
          modObj["auctionvalid"] = categoryDetails[i].auctionvalid;
        }
        // check data cateid
        if (
          categoryDetails[i].cateid == undefined ||
          categoryDetails[i].cateid == null
        ) {
          modObj["cateid"] = "";
        } else {
          modObj["cateid"] = categoryDetails[i].cateid;
        }
        // check data cateval
        if (
          categoryDetails[i].cateval == undefined ||
          categoryDetails[i].cateval == null
        ) {
          modObj["cateval"] = "";
        } else {
          modObj["cateval"] = categoryDetails[i].cateval;
        }
        // check data catevalid
        if (
          categoryDetails[i].catevalid == undefined ||
          categoryDetails[i].catevalid == null
        ) {
          modObj["catevalid"] = "";
        } else {
          modObj["catevalid"] = categoryDetails[i].catevalid;
        }
        // check data entitytypevalueid
        if (
          categoryDetails[i].entitytypevalueid == undefined ||
          categoryDetails[i].entitytypevalueid == null
        ) {
          modObj["entitytypevalueid"] = "";
        } else {
          modObj["entitytypevalueid"] = categoryDetails[i].entitytypevalueid;
        }
        modObj["index"] = i;
      }
      respData.categoryDetails.push(modObj);
    }
  }
  return respData;
}
// for modify tearms condition details data
export async function modifyTearmsConditionDetails(data) {
  let resData = data.response[0];
  let modData = {};
  // check data id
  if (resData.id == undefined || resData.id == null) {
    modData["id"] = "";
  } else {
    modData["id"] = resData.id;
  }
  // check data templateid
  if (resData.templateid == undefined || resData.templateid == null) {
    modData["templateid"] = "";
  } else {
    modData["templateid"] = resData.templateid;
  }
  // check data entitytypeid
  if (resData.entitytypeid == undefined || resData.entitytypeid == null) {
    modData["entitytypeid"] = "";
  } else {
    modData["entitytypeid"] = resData.entitytypeid;
  }
  // check data categoryid
  if (resData.categoryid == undefined || resData.categoryid == null) {
    modData["categoryid"] = "";
  } else {
    modData["categoryid"] = resData.categoryid;
  }
  // check data sequenceno
  if (resData.sequenceno == undefined || resData.sequenceno == null) {
    modData["sequenceno"] = "";
  } else {
    modData["sequenceno"] = resData.sequenceno;
  }
  // check data fieldid
  if (resData.fieldid == undefined || resData.fieldid == null) {
    modData["fieldid"] = "";
  } else {
    modData["fieldid"] = resData.fieldid;
  }
  // check data fieldvalue
  if (resData.fieldvalue == undefined || resData.fieldvalue == null) {
    modData["fieldvalue"] = "";
  } else {
    modData["fieldvalue"] = resData.fieldvalue;
  }

  return modData;
}
// for modify activity details data
export function modifyActivityDetails(data) {
  var respData = { activityDetails: [] };
  if (data) {
    let activityDetails = data.response;
    let ActivityRoleId = [];
    let indexArr = [];
    if (activityDetails && activityDetails.length > 0) {
      for (let i = 0; i < activityDetails.length; i++) {
        let modObj = {};
        // check data activitylog
        if (
          activityDetails[i].activitylog == undefined ||
          activityDetails[i].activitylog == null
        ) {
          modObj["activitylog"] = "";
        } else {
          modObj["activitylog"] = activityDetails[i].activitylog;
        }
        // check data activityname
        if (
          activityDetails[i].activityname == undefined ||
          activityDetails[i].activityname == null
        ) {
          modObj["activityname"] = "";
        } else {
          modObj["activityname"] = activityDetails[i].activityname;
        }
        // check data activitynotificationid
        if (
          activityDetails[i].activitynotificationid == undefined ||
          activityDetails[i].activitynotificationid == null
        ) {
          modObj["activitynotificationid"] = "";
        } else {
          modObj["activitynotificationid"] =
            activityDetails[i].activitynotificationid;
        }
        // check data auctionroleid
        if (
          activityDetails[i].auctionroleid == undefined ||
          activityDetails[i].auctionroleid == null
        ) {
          modObj["auctionroleid"] = "";
        } else {
          modObj["auctionroleid"] = activityDetails[i].auctionroleid;
        }
        // check data entityfieldmasterid
        if (
          activityDetails[i].entityfieldmasterid == undefined ||
          activityDetails[i].entityfieldmasterid == null
        ) {
          modObj["entityfieldmasterid"] = "";
        } else {
          modObj["entityfieldmasterid"] =
            activityDetails[i].entityfieldmasterid;
        }
        // check data id
        if (
          activityDetails[i].id == undefined ||
          activityDetails[i].id == null
        ) {
          modObj["id"] = "";
        } else {
          modObj["id"] = activityDetails[i].id;
        }
        // check data isread
        if (
          activityDetails[i].isread == undefined ||
          activityDetails[i].isread == null
        ) {
          modObj["isread"] = "";
        } else {
          modObj["isread"] = activityDetails[i].isread;
        }
        // check data primarykeyvalue
        if (
          activityDetails[i].primarykeyvalue == undefined ||
          activityDetails[i].primarykeyvalue == null
        ) {
          modObj["primarykeyvalue"] = "";
        } else {
          modObj["primarykeyvalue"] = activityDetails[i].primarykeyvalue;
        }
        // check data roleid
        if (
          activityDetails[i].roleid == undefined ||
          activityDetails[i].roleid == null
        ) {
          modObj["roleid"] = "";
        } else {
          modObj["roleid"] = activityDetails[i].roleid;
        }
        // check data rolename
        if (
          activityDetails[i].rolename == undefined ||
          activityDetails[i].rolename == null
        ) {
          modObj["rolename"] = "";
        } else {
          modObj["rolename"] = activityDetails[i].rolename;
        }
        // check data time
        if (
          activityDetails[i].time == undefined ||
          activityDetails[i].time == null
        ) {
          modObj["time"] = "";
        } else {
          modObj["time"] = activityDetails[i].time;
        }
        // check data userfirstname
        if (
          activityDetails[i].userfirstname == undefined ||
          activityDetails[i].userfirstname == null
        ) {
          modObj["userfirstname"] = "";
        } else {
          modObj["userfirstname"] = activityDetails[i].userfirstname;
        }
        // check data userlastname
        if (
          activityDetails[i].userlastname == undefined ||
          activityDetails[i].userlastname == null
        ) {
          modObj["userlastname"] = "";
        } else {
          modObj["userlastname"] = activityDetails[i].userlastname;
        }
        // check data activityname
        if (activityDetails[i].activityname == "Vendor Bidding") {
          if (!ActivityRoleId.includes(activityDetails[i].roleid)) {
            ActivityRoleId.push(activityDetails[i].roleid);
          }
        }
        modObj["index"] = i;

        respData.activityDetails.push(modObj);
      }
    }

    for (let i = 0; i < ActivityRoleId.length; i++) {
      indexArr.push(
        activityDetails.findIndex((x) => x.roleid === ActivityRoleId[i])
      );
    }

    for (let i = 0; i < respData.activityDetails.length; i++) {
      if (respData.activityDetails[i].activityname == "Vendor Bidding") {
        if (indexArr.includes(i)) {
          Object.assign(respData.activityDetails[i], {
            strikeThroughCheck: false,
          });
        } else {
          Object.assign(respData.activityDetails[i], {
            strikeThroughCheck: true,
          });
        }
      } else {
        Object.assign(respData.activityDetails[i], {
          strikeThroughCheck: false,
        });
      }
    }
  }
  return respData;
}
