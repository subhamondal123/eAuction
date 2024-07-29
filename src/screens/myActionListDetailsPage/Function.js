// for modify auction live list details data
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
          if (
            auctionList[i][j].id == undefined ||
            auctionList[i][j].id == null
          ) {
            modObj["id"] = "";
          } else {
            modObj["id"] = auctionList[i][j].id;
          }
          if (
            auctionList[i][j].productid == undefined ||
            auctionList[i][j].productid == null
          ) {
            modObj["productid"] = "";
          } else {
            modObj["productid"] = auctionList[i][j].productid;
          }
          if (
            auctionList[i][j].productdesc == undefined ||
            auctionList[i][j].productdesc == null
          ) {
            modObj["productdesc"] = "";
          } else {
            modObj["productdesc"] = auctionList[i][j].productdesc;
          }
          if (
            auctionList[i][j].gst == undefined ||
            auctionList[i][j].gst == null
          ) {
            modObj["gst"] = "";
          } else {
            modObj["gst"] = auctionList[i][j].gst;
          }
          if (
            auctionList[i][j].unitdesc == undefined ||
            auctionList[i][j].unitdesc == null
          ) {
            modObj["unitdesc"] = "";
          } else {
            modObj["unitdesc"] = auctionList[i][j].unitdesc;
          }
          if (
            auctionList[i][j].fieldid == undefined ||
            auctionList[i][j].fieldid == null
          ) {
            modObj["fieldid"] = "";
          } else {
            modObj["fieldid"] = auctionList[i][j].fieldid;
          }
          if (
            auctionList[i][j].isrequired == undefined ||
            auctionList[i][j].isrequired == null
          ) {
            modObj["isrequired"] = "";
          } else {
            modObj["isrequired"] = auctionList[i][j].isrequired;
          }
          if (
            auctionList[i][j].permission == undefined ||
            auctionList[i][j].permission == null
          ) {
            modObj["permission"] = "";
          } else {
            modObj["permission"] = auctionList[i][j].permission;
          }
          if (
            auctionList[i][j].isDetailedView == undefined ||
            auctionList[i][j].isDetailedView == null
          ) {
            modObj["isDetailedView"] = "";
          } else {
            modObj["isDetailedView"] = auctionList[i][j].isDetailedView;
          }

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
        if (
          vendorDetails[i].auctionfieldsvalueheaderid == undefined ||
          vendorDetails[i].auctionfieldsvalueheaderid == null
        ) {
          modObj["auctionfieldsvalueheaderid"] = "";
        } else {
          modObj["auctionfieldsvalueheaderid"] =
            vendorDetails[i].auctionfieldsvalueheaderid;
        }
        if (
          vendorDetails[i].entityfieldmasterid == undefined ||
          vendorDetails[i].entityfieldmasterid == null
        ) {
          modObj["entityfieldmasterid"] = "";
        } else {
          modObj["entityfieldmasterid"] = vendorDetails[i].entityfieldmasterid;
        }
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
        if (
          categoryDetails[i].auctionid == undefined ||
          categoryDetails[i].auctionid == null
        ) {
          modObj["auctionid"] = "";
        } else {
          modObj["auctionid"] = categoryDetails[i].auctionid;
        }
        if (
          categoryDetails[i].auctionval == undefined ||
          categoryDetails[i].auctionval == null
        ) {
          modObj["auctionval"] = "";
        } else {
          modObj["auctionval"] = categoryDetails[i].auctionval;
        }
        if (
          categoryDetails[i].auctionvalid == undefined ||
          categoryDetails[i].auctionvalid == null
        ) {
          modObj["auctionvalid"] = "";
        } else {
          modObj["auctionvalid"] = categoryDetails[i].auctionvalid;
        }
        if (
          categoryDetails[i].cateid == undefined ||
          categoryDetails[i].cateid == null
        ) {
          modObj["cateid"] = "";
        } else {
          modObj["cateid"] = categoryDetails[i].cateid;
        }
        if (
          categoryDetails[i].cateval == undefined ||
          categoryDetails[i].cateval == null
        ) {
          modObj["cateval"] = "";
        } else {
          modObj["cateval"] = categoryDetails[i].cateval;
        }
        if (
          categoryDetails[i].catevalid == undefined ||
          categoryDetails[i].catevalid == null
        ) {
          modObj["catevalid"] = "";
        } else {
          modObj["catevalid"] = categoryDetails[i].catevalid;
        }
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
  if (resData.id == undefined || resData.id == null) {
    modData["id"] = "";
  } else {
    modData["id"] = resData.id;
  }
  if (resData.templateid == undefined || resData.templateid == null) {
    modData["templateid"] = "";
  } else {
    modData["templateid"] = resData.templateid;
  }
  if (resData.entitytypeid == undefined || resData.entitytypeid == null) {
    modData["entitytypeid"] = "";
  } else {
    modData["entitytypeid"] = resData.entitytypeid;
  }
  if (resData.categoryid == undefined || resData.categoryid == null) {
    modData["categoryid"] = "";
  } else {
    modData["categoryid"] = resData.categoryid;
  }
  if (resData.sequenceno == undefined || resData.sequenceno == null) {
    modData["sequenceno"] = "";
  } else {
    modData["sequenceno"] = resData.sequenceno;
  }
  if (resData.fieldid == undefined || resData.fieldid == null) {
    modData["fieldid"] = "";
  } else {
    modData["fieldid"] = resData.fieldid;
  }
  if (resData.fieldvalue == undefined || resData.fieldvalue == null) {
    modData["fieldvalue"] = "";
  } else {
    modData["fieldvalue"] = resData.fieldvalue;
  }

  return modData;
}
// for modify vendor list details data
export async function modifyVendorListDetails(data) {
  var respData = { vendorData: [] };
  if (data) {
    let vendorData = data.response;
    if (vendorData && vendorData.length > 0) {
      let modObj = {};
      for (let i = 0; i < vendorData.length; i++) {
        if (
          vendorData[i].trnauctionvndorid == undefined ||
          vendorData[i].trnauctionvndorid == null
        ) {
          modObj["trnauctionvndorid"] = "";
        } else {
          modObj["trnauctionvndorid"] = vendorData[i].trnauctionvndorid;
        }
        if (
          vendorData[i].entityfieldmasterid == undefined ||
          vendorData[i].entityfieldmasterid == null
        ) {
          modObj["entityfieldmasterid"] = "";
        } else {
          modObj["entityfieldmasterid"] = vendorData[i].entityfieldmasterid;
        }
        if (
          vendorData[i].primarykeyvalue == undefined ||
          vendorData[i].primarykeyvalue == null
        ) {
          modObj["primarykeyvalue"] = "";
        } else {
          modObj["primarykeyvalue"] = vendorData[i].primarykeyvalue;
        }
        if (
          vendorData[i].approvedflg == undefined ||
          vendorData[i].approvedflg == null
        ) {
          modObj["approvedflg"] = "";
        } else {
          modObj["approvedflg"] = vendorData[i].approvedflg;
        }
        if (vendorData[i].roleid == undefined || vendorData[i].roleid == null) {
          modObj["roleid"] = "";
        } else {
          modObj["roleid"] = vendorData[i].roleid;
        }

        modObj["index"] = i;
      }
      respData.vendorData.push(modObj);
    }
  }
  return respData;
}
// for modify selection vendor details data
export async function modifySelectionVendorDetails(data) {
  var respData = { selectionProductdetails: [] };
  if (data) {
    let selectionProDetails = data.response;
    if (selectionProDetails && selectionProDetails.length > 0) {
      for (let i = 0; i < selectionProDetails.length; i++) {
        let subSelectionArr = [];
        let modObj = {};
        for (let j = 0; j < selectionProDetails[i].length; j++) {
          if (
            selectionProDetails[i][j].productid == undefined ||
            selectionProDetails[i][j].productid == null
          ) {
            modObj["id"] = "";
          } else {
            modObj["id"] = selectionProDetails[i][j].productid;
          }
          if (
            selectionProDetails[i][j].productdesc == undefined ||
            selectionProDetails[i][j].productdesc == null
          ) {
            modObj["productdesc"] = "";
          } else {
            modObj["productdesc"] = selectionProDetails[i][j].productdesc;
          }
          if (
            selectionProDetails[i][j].unitdesc == undefined ||
            selectionProDetails[i][j].unitdesc == null
          ) {
            modObj["unitdesc"] = "";
          } else {
            modObj["unitdesc"] = selectionProDetails[i][j].unitdesc;
          }
          if (
            selectionProDetails[i][j].fieldvalue == undefined ||
            selectionProDetails[i][j].fieldvalue == null
          ) {
            modObj["fieldvalue"] = "";
          } else {
            modObj["fieldvalue"] = selectionProDetails[i][j].fieldvalue;
          }

          if (selectionProDetails[i][j].fielddesc == "qtyrequired") {
            modObj["requiredQty"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "auctionbaseprice") {
            modObj["basePrice"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "auctiondeldate") {
            modObj["auctionDeliveryDate"] =
              selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "availableqty") {
            modObj["availableQty"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "price") {
            modObj["price"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "frieght") {
            modObj["frieght"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "cgst") {
            modObj["cgst"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "sgst") {
            modObj["sgst"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "igst") {
            modObj["igst"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "totalamt") {
            modObj["totalAmount"] = selectionProDetails[i][j].fieldvalue;
          }
          if (selectionProDetails[i][j].fielddesc == "subamount") {
            modObj["subAmount"] = selectionProDetails[i][j].fieldvalue;
          }
        }
        subSelectionArr.push(modObj);

        modObj["check"] = false;
        modObj["tick"] = false;
        modObj["showHide"] = false;
        respData.selectionProductdetails.push(modObj);
      }
    }
  }
  return respData;
}
