// create a modify function used for modify fetching  auctioneer live list details data 
export async function modifyAuctioneerLiveListDetails(data) {
    var respData = { "auctioneerLiveList": [], "auctionId": "", "startDate": "", "auctionEndTime": "", "endTime": "" };
    if (data) {
        let auctioneerListDetails = data.response;
        if (auctioneerListDetails && auctioneerListDetails.length > 0) {

            for (let i = 0; i < auctioneerListDetails.length; i++) {
                let modObj = {};
                // check data auctionfieldsvalueheaderid
                if (auctioneerListDetails[i].auctionfieldsvalueheaderid == undefined || auctioneerListDetails[i].auctionfieldsvalueheaderid == null) {
                    modObj["auctionfieldsvalueheaderid"] = "";
                } else {
                    modObj["auctionfieldsvalueheaderid"] = auctioneerListDetails[i].auctionfieldsvalueheaderid;
                }
                // check data creatorrole
                if (auctioneerListDetails[i].creatorrole == undefined || auctioneerListDetails[i].creatorrole == null) {
                    modObj["creatorrole"] = "";
                } else {
                    modObj["creatorrole"] = auctioneerListDetails[i].creatorrole;
                }
                // check data entitytypeid
                if (auctioneerListDetails[i].entitytypeid == undefined || auctioneerListDetails[i].entitytypeid == null) {
                    modObj["entitytypeid"] = "";
                } else {
                    modObj["entitytypeid"] = auctioneerListDetails[i].entitytypeid;
                }
                // check data primefielddesc
                if (auctioneerListDetails[i].primefielddesc == undefined || auctioneerListDetails[i].primefielddesc == null) {
                    modObj["primefielddesc"] = "";
                } else {
                    modObj["primefielddesc"] = auctioneerListDetails[i].primefielddesc;
                }
                // check data fielddesc
                if (auctioneerListDetails[i].fielddesc == undefined || auctioneerListDetails[i].fielddesc == null) {
                    modObj["fielddesc"] = "";
                } else {
                    modObj["fielddesc"] = auctioneerListDetails[i].fielddesc;
                }
                // check data fieldid
                if (auctioneerListDetails[i].fieldid == undefined || auctioneerListDetails[i].fieldid == null) {
                    modObj["fieldid"] = "";
                } else {
                    modObj["fieldid"] = auctioneerListDetails[i].fieldid;
                }
                // check data fieldlabeldesc
                if (auctioneerListDetails[i].fieldlabeldesc == undefined || auctioneerListDetails[i].fieldlabeldesc == null) {
                    modObj["fieldlabeldesc"] = "";
                } else {
                    modObj["fieldlabeldesc"] = auctioneerListDetails[i].fieldlabeldesc;
                }
                // check data fieldtype
                if (auctioneerListDetails[i].fieldtype == undefined || auctioneerListDetails[i].fieldtype == null) {
                    modObj["fieldtype"] = "";
                } else {
                    modObj["fieldtype"] = auctioneerListDetails[i].fieldtype;
                }
                // check data fieldvalue
                if (auctioneerListDetails[i].fieldvalue == undefined || auctioneerListDetails[i].fieldvalue == null) {
                    modObj["fieldvalue"] = "";
                } else {
                    modObj["fieldvalue"] = auctioneerListDetails[i].fieldvalue;
                }
                // check data id
                if (auctioneerListDetails[i].id == undefined || auctioneerListDetails[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = auctioneerListDetails[i].id;
                }
                // check data primefield
                if (auctioneerListDetails[i].primefield == undefined || auctioneerListDetails[i].primefield == null) {
                    modObj["primefield"] = "";
                } else {
                    modObj["primefield"] = auctioneerListDetails[i].primefield;
                }
                // check data primefieldlable
                if (auctioneerListDetails[i].primefieldlable == undefined || auctioneerListDetails[i].primefieldlable == null) {
                    modObj["primefieldlable"] = "";
                } else {
                    modObj["primefieldlable"] = auctioneerListDetails[i].primefieldlable;
                }
                // check data primefieldtype
                if (auctioneerListDetails[i].primefieldtype == undefined || auctioneerListDetails[i].primefieldtype == null) {
                    modObj["primefieldtype"] = "";
                } else {
                    modObj["primefieldtype"] = auctioneerListDetails[i].primefieldtype;
                }



                // check data fieldlabeldesc
                if (auctioneerListDetails[i].fieldlabeldesc == "Auction Start Date") {
                    respData.startDate = auctioneerListDetails[i].fieldvalue;
                }
                if (auctioneerListDetails[i].fieldlabeldesc == "Auction End Time") {
                    respData.endTime = auctioneerListDetails[i].fieldvalue;
                }
                if (auctioneerListDetails[i].fieldlabeldesc == "Auction End Date & Time") {
                    respData.auctionEndTime = auctioneerListDetails[i].fieldvalue;
                }


                // if (auctioneerListDetails[i].fieldlabeldesc == "Auction Start Time") {
                //     modObj["startTime"] = auctioneerListDetails[i].fieldvalue;
                // }
                // if (auctioneerListDetails[i].fieldlabeldesc == "Auction End Date") {
                //     modObj["endDate"] = auctioneerListDetails[i].fieldvalue;
                // }

                // if (auctioneerListDetails[i].fieldlabeldesc == "Actual Auction End Date & Time") {
                //     modObj["actualEndTime"] = auctioneerListDetails[i].fieldvalue;
                // }

                // if (auctioneerListDetails[i].fielddesc == "auctiondescfile") {
                //     modObj["auctionDescFile"] = auctioneerListDetails[i].fieldvalue;
                // }
                // if (auctioneerListDetails[i].fieldlabeldesc == "Delivery Instruction") {
                //     modObj["deliveryIns"] = auctioneerListDetails[i].fieldvalue;
                // }
                // if (auctioneerListDetails[i].fieldlabeldesc == "Auction Description") {
                //     modObj["auctionDes"] = auctioneerListDetails[i].fieldvalue;
                // }
                respData.auctioneerLiveList.push(modObj);
            }
            const filteredData = respData.auctioneerLiveList.filter(item => item.fielddesc !== "actualauctionenddatetime" && item.fielddesc !== "auctionenddatetime" && item.fielddesc !== "auctionstartdatetime" && item.fielddesc !== "deliveryinstruction" && item.fielddesc !== "bidderview" && item.fieldvalue.length > 0);
            console.log("filterdata----", filteredData)


            respData.auctionId = auctioneerListDetails[0].primevalue == undefined || auctioneerListDetails[0].primevalue == null ? "" : auctioneerListDetails[0].primevalue == undefined || auctioneerListDetails[0].primevalue
            respData.auctioneerLiveList = filteredData

        }
    }
    // console.log(">>>>>>>>>>tttttttttttt>>>", respData)
    return (respData);

}


// for modify product details data 
export async function modifyProductDetails(data) {
    var respData = { "productDetails": [] };
    if (data) {
        let auctionList = data.response;
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
                    // check data productid
                    if (auctionList[i][j].productid) {
                        modObj["productid"] = auctionList[i][j].productid;
                    }
                    // else {
                    //     modObj["productid"] = auctionList[i][j].productid;
                    // }
                    // check data productdesc
                    if (auctionList[i][j].productdesc == undefined || auctionList[i][j].productdesc == null) {
                        modObj["productdesc"] = auctionList[i][0].productdesc;
                    } else {
                        modObj["productdesc"] = auctionList[i][j].productdesc;
                    }
                    // check data gst
                    if (auctionList[i][j].gst == undefined || auctionList[i][j].gst == null) {
                        modObj["gst"] = auctionList[i][0].gst;
                    } else {
                        modObj["gst"] = auctionList[i][j].gst;
                    }
                    // check data unitdesc
                    if (auctionList[i][j].unitdesc == undefined || auctionList[i][j].unitdesc == null) {
                        modObj["unitdesc"] = auctionList[i][0].unitdesc;
                    } else {
                        modObj["unitdesc"] = auctionList[i][j].unitdesc;
                    }
                    // check data fieldid
                    if (auctionList[i][j].fieldid == undefined || auctionList[i][j].fieldid == null) {
                        modObj["fieldid"] = "";
                    } else {
                        modObj["fieldid"] = auctionList[i][j].fieldid;
                    }
                    // check data isrequired
                    if (auctionList[i][j].isrequired == undefined || auctionList[i][j].isrequired == null) {
                        modObj["isrequired"] = "";
                    } else {
                        modObj["isrequired"] = auctionList[i][j].isrequired;
                    }
                    // check data permission
                    if (auctionList[i][j].permission == undefined || auctionList[i][j].permission == null) {
                        modObj["permission"] = "";
                    } else {
                        modObj["permission"] = auctionList[i][j].permission;
                    }
                    // check data isDetailedView
                    if (auctionList[i][j].isDetailedView == undefined || auctionList[i][j].isDetailedView == null) {
                        modObj["isDetailedView"] = "";
                    } else {
                        modObj["isDetailedView"] = auctionList[i][j].isDetailedView;
                    }

                    // check data fielddesc
                    if (auctionList[i][j].fielddesc == "qtyrequired") {
                        modObj["requiredQty"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["requiredQtyPermission"] = auctionList[i][j].permission;
                        modObj["requiredQtyFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["requiredQtyFieldId"] = auctionList[i][j].fieldid;
                        modObj["requiredQtyFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "auctionbaseprice") {
                        modObj["basePrice"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "auctiondeldate") {
                        modObj["auctionDeliveryDate"] = auctionList[i][j].fieldvalue;

                    }
                    if (auctionList[i][j].fielddesc == "availableqty") {
                        modObj["availableQty"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["availableQtyPermission"] = auctionList[i][j].permission;
                        modObj["availableQtyFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["availableQtyFieldId"] = auctionList[i][j].fieldid;
                        modObj["availableQtyFieldDesc"] = auctionList[i][j].fielddesc;
                    }

                    if (auctionList[i][j].fielddesc == "price") {
                        modObj["price"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["pricePermission"] = auctionList[i][j].permission;
                        modObj["priceFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["priceFieldId"] = auctionList[i][j].fieldid;
                        modObj["priceFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "frieght") {
                        modObj["frieght"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["frieghtPermission"] = auctionList[i][j].permission;
                        modObj["frieghtFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["frieghtFieldId"] = auctionList[i][j].fieldid;
                        modObj["frieghtFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "cgst") {
                        modObj["cgst"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;;
                        modObj["cgstPermission"] = auctionList[i][j].permission;
                        modObj["cgstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["cgstFieldId"] = auctionList[i][j].fieldid;
                        modObj["cgstFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "sgst") {
                        modObj["sgst"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;;
                        modObj["sgstPermission"] = auctionList[i][j].permission;
                        modObj["sgstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["sgstFieldId"] = auctionList[i][j].fieldid;
                        modObj["sgstFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "igst") {
                        modObj["igst"] = auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0 ? "00" : auctionList[i][j].fieldvalue;
                        modObj["igstPermission"] = auctionList[i][j].permission;
                        modObj["igstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["igstFieldId"] = auctionList[i][j].fieldid;
                        modObj["igstFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "totalamt") {
                        modObj["totalAmount"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;
                        modObj["totalAmountPermission"] = auctionList[i][j].permission;
                        modObj["totalAmountFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["totalAmountFieldId"] = auctionList[i][j].fieldid;
                        modObj["totalAmountFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "auctionticksize") {
                        modObj["tickSize"] = auctionList[i][j].fieldvalue;
                        modObj["tickSizePermission"] = auctionList[i][j].permission;
                        modObj["tickSizeFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["tickSizeFieldId"] = auctionList[i][j].fieldid;
                        modObj["tickSizeFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "subamount") {
                        modObj["subAmount"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;
                        modObj["subAmountPermission"] = auctionList[i][j].permission;
                        modObj["subAmountFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["subAmountFieldId"] = auctionList[i][j].fieldid;
                        modObj["subAmountFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                }
                subAuctionArr.push(modObj)
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.productDetails.push(modObj);

            }
        }
    }

    return (respData);
}


// for modify previous product details data 
export async function modifyPreviousProductDetails(data) {
    var respData = { "productDetails": [] };
    if (data) {
        let auctionList = data.response;
        if (auctionList && auctionList.length > 0) {
            for (let i = 0; i < auctionList.length; i++) {
                let subAuctionArr = [];
                let modObj = {};
                for (let j = 0; j < auctionList[i].length; j++) {
                    if (auctionList[i][j].id == undefined || auctionList[i][j].id == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = auctionList[i][j].id;
                    }
                    if (auctionList[i][j].productid) {
                        modObj["productid"] = auctionList[i][j].productid;
                    }
                    // else {
                    //     modObj["productid"] = auctionList[i][j].productid;
                    // }
                    if (auctionList[i][j].productdesc == undefined || auctionList[i][j].productdesc == null) {
                        modObj["productdesc"] = auctionList[i][0].productdesc;
                    } else {
                        modObj["productdesc"] = auctionList[i][j].productdesc;
                    }
                    if (auctionList[i][j].gst == undefined || auctionList[i][j].gst == null) {
                        modObj["gst"] = auctionList[i][0].gst;
                    } else {
                        modObj["gst"] = auctionList[i][j].gst;
                    }
                    if (auctionList[i][j].unitdesc == undefined || auctionList[i][j].unitdesc == null) {
                        modObj["unitdesc"] = auctionList[i][0].unitdesc;
                    } else {
                        modObj["unitdesc"] = auctionList[i][j].unitdesc;
                    }
                    if (auctionList[i][j].fieldid == undefined || auctionList[i][j].fieldid == null) {
                        modObj["fieldid"] = "";
                    } else {
                        modObj["fieldid"] = auctionList[i][j].fieldid;
                    }
                    if (auctionList[i][j].isrequired == undefined || auctionList[i][j].isrequired == null) {
                        modObj["isrequired"] = "";
                    } else {
                        modObj["isrequired"] = auctionList[i][j].isrequired;
                    }
                    if (auctionList[i][j].permission == undefined || auctionList[i][j].permission == null) {
                        modObj["permission"] = "";
                    } else {
                        modObj["permission"] = auctionList[i][j].permission;
                    }
                    if (auctionList[i][j].isDetailedView == undefined || auctionList[i][j].isDetailedView == null) {
                        modObj["isDetailedView"] = "";
                    } else {
                        modObj["isDetailedView"] = auctionList[i][j].isDetailedView;
                    }


                    if (auctionList[i][j].fielddesc == "qtyrequired") {
                        modObj["requiredQty"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["requiredQtyPermission"] = auctionList[i][j].permission;
                        modObj["requiredQtyFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["requiredQtyFieldId"] = auctionList[i][j].fieldid;
                        modObj["requiredQtyFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "auctionbaseprice") {
                        modObj["basePrice"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "auctiondeldate") {
                        modObj["auctionDeliveryDate"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;

                    }
                    if (auctionList[i][j].fielddesc == "availableqty") {
                        modObj["availableQty"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["availableQtyPermission"] = auctionList[i][j].permission;
                        modObj["availableQtyFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["availableQtyFieldId"] = auctionList[i][j].fieldid;
                        modObj["availableQtyFieldDesc"] = auctionList[i][j].fielddesc;
                    }

                    if (auctionList[i][j].fielddesc == "price") {
                        modObj["price"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["pricePermission"] = auctionList[i][j].permission;
                        modObj["priceFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["priceFieldId"] = auctionList[i][j].fieldid;
                        modObj["priceFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "frieght") {
                        modObj["frieght"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? "" : auctionList[i][j].fieldvalue;
                        modObj["frieghtPermission"] = auctionList[i][j].permission;
                        modObj["frieghtFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["frieghtFieldId"] = auctionList[i][j].fieldid;
                        modObj["frieghtFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "cgst") {
                        modObj["cgst"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;;
                        modObj["cgstPermission"] = auctionList[i][j].permission;
                        modObj["cgstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["cgstFieldId"] = auctionList[i][j].fieldid;
                        modObj["cgstFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "sgst") {
                        modObj["sgst"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;;
                        modObj["sgstPermission"] = auctionList[i][j].permission;
                        modObj["sgstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["sgstFieldId"] = auctionList[i][j].fieldid;
                        modObj["sgstFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "igst") {
                        modObj["igst"] = auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0 ? "00" : auctionList[i][j].fieldvalue;
                        modObj["igstPermission"] = auctionList[i][j].permission;
                        modObj["igstFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["igstFieldId"] = auctionList[i][j].fieldid;
                        modObj["igstFieldDesc"] = auctionList[i][j].fielddesc;
                    }
                    if (auctionList[i][j].fielddesc == "totalamt") {
                        modObj["totalAmount"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;
                        modObj["totalAmountPermission"] = auctionList[i][j].permission;
                        modObj["totalAmountFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["totalAmountFieldId"] = auctionList[i][j].fieldid;
                        modObj["totalAmountFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "auctionticksize") {
                        modObj["tickSize"] = auctionList[i][j].fieldvalue;
                        modObj["tickSizePermission"] = auctionList[i][j].permission;
                        modObj["tickSizeFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["tickSizeFieldId"] = auctionList[i][j].fieldid;
                        modObj["tickSizeFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                    if (auctionList[i][j].fielddesc == "subamount") {
                        modObj["subAmount"] = (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null || auctionList[i][j].fieldvalue.length == 0) ? 0 : auctionList[i][j].fieldvalue;
                        modObj["subAmountPermission"] = auctionList[i][j].permission;
                        modObj["subAmountFieldLabelDesc"] = auctionList[i][j].fieldlabeldesc;
                        modObj["subAmountFieldId"] = auctionList[i][j].fieldid;
                        modObj["subAmountFieldDesc"] = auctionList[i][j].fielddesc;

                    }
                }
                subAuctionArr.push(modObj)
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.productDetails.push(modObj);

            }
        }
    }

    return (respData);
}
// for modify category details data 
export async function modifyCategoryDetails(data) {
    var respData = { "categoryDetails": [] };
    if (data) {
        let categoryDetails = data.response;
        if (categoryDetails && categoryDetails.length > 0) {
            let modObj = {};
            for (let i = 0; i < categoryDetails.length; i++) {

                if (categoryDetails[i].auctionid == undefined || categoryDetails[i].auctionid == null) {
                    modObj["auctionid"] = "";
                } else {
                    modObj["auctionid"] = categoryDetails[i].auctionid;
                }
                if (categoryDetails[i].auctionval == undefined || categoryDetails[i].auctionval == null) {
                    modObj["auctionval"] = "";
                } else {
                    modObj["auctionval"] = categoryDetails[i].auctionval;
                }
                if (categoryDetails[i].auctionvalid == undefined || categoryDetails[i].auctionvalid == null) {
                    modObj["auctionvalid"] = "";
                } else {
                    modObj["auctionvalid"] = categoryDetails[i].auctionvalid;
                }
                if (categoryDetails[i].cateid == undefined || categoryDetails[i].cateid == null) {
                    modObj["cateid"] = "";
                } else {
                    modObj["cateid"] = categoryDetails[i].cateid;
                }
                if (categoryDetails[i].cateval == undefined || categoryDetails[i].cateval == null) {
                    modObj["cateval"] = "";
                } else {
                    modObj["cateval"] = categoryDetails[i].cateval;
                }
                if (categoryDetails[i].catevalid == undefined || categoryDetails[i].catevalid == null) {
                    modObj["catevalid"] = "";
                } else {
                    modObj["catevalid"] = categoryDetails[i].catevalid;
                }
                if (categoryDetails[i].entitytypevalueid == undefined || categoryDetails[i].entitytypevalueid == null) {
                    modObj["entitytypevalueid"] = "";
                } else {
                    modObj["entitytypevalueid"] = categoryDetails[i].entitytypevalueid;
                }
                modObj["index"] = i;
            }
            respData.categoryDetails.push(modObj);
        }
    }
    return (respData);

}


// for modify tearms condition details data 
export async function modifyTearmsConditionDetails(data) {
    let resData = data.response[0];
    let modData = {}
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
// for modify activity details data 
export function modifyActivityDetails(data) {
    var respData = { "activityDetails": [] };
    if (data) {
        let activityDetails = data.response;
        if (activityDetails && activityDetails.length > 0) {

            for (let i = 0; i < activityDetails.length; i++) {
                let modObj = {};
                if (activityDetails[i].activitylog == undefined || activityDetails[i].activitylog == null) {
                    modObj["activitylog"] = "";
                } else {
                    modObj["activitylog"] = activityDetails[i].activitylog;
                }
                if (activityDetails[i].activityname == undefined || activityDetails[i].activityname == null) {
                    modObj["activityname"] = "";
                } else {
                    modObj["activityname"] = activityDetails[i].activityname;
                }
                if (activityDetails[i].activitynotificationid == undefined || activityDetails[i].activitynotificationid == null) {
                    modObj["activitynotificationid"] = "";
                } else {
                    modObj["activitynotificationid"] = activityDetails[i].activitynotificationid;
                }
                if (activityDetails[i].auctionroleid == undefined || activityDetails[i].auctionroleid == null) {
                    modObj["auctionroleid"] = "";
                } else {
                    modObj["auctionroleid"] = activityDetails[i].auctionroleid;
                }
                if (activityDetails[i].entityfieldmasterid == undefined || activityDetails[i].entityfieldmasterid == null) {
                    modObj["entityfieldmasterid"] = "";
                } else {
                    modObj["entityfieldmasterid"] = activityDetails[i].entityfieldmasterid;
                }
                if (activityDetails[i].id == undefined || activityDetails[i].id == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = activityDetails[i].id;
                }
                if (activityDetails[i].isread == undefined || activityDetails[i].isread == null) {
                    modObj["isread"] = "";
                } else {
                    modObj["isread"] = activityDetails[i].isread;
                }
                if (activityDetails[i].primarykeyvalue == undefined || activityDetails[i].primarykeyvalue == null) {
                    modObj["primarykeyvalue"] = "";
                } else {
                    modObj["primarykeyvalue"] = activityDetails[i].primarykeyvalue;
                }
                if (activityDetails[i].roleid == undefined || activityDetails[i].roleid == null) {
                    modObj["roleid"] = "";
                } else {
                    modObj["roleid"] = activityDetails[i].roleid;
                }
                if (activityDetails[i].rolename == undefined || activityDetails[i].rolename == null) {
                    modObj["rolename"] = "";
                } else {
                    modObj["rolename"] = activityDetails[i].rolename;
                }
                if (activityDetails[i].time == undefined || activityDetails[i].time == null) {
                    modObj["time"] = "";
                } else {
                    modObj["time"] = activityDetails[i].time;
                }
                if (activityDetails[i].userfirstname == undefined || activityDetails[i].userfirstname == null) {
                    modObj["userfirstname"] = "";
                } else {
                    modObj["userfirstname"] = activityDetails[i].userfirstname;
                }
                if (activityDetails[i].userlastname == undefined || activityDetails[i].userlastname == null) {
                    modObj["userlastname"] = "";
                } else {
                    modObj["userlastname"] = activityDetails[i].userlastname;
                }

                if (activityDetails[i].activityname == "Vendor Bidding") {
                    if (i == 0) {
                        modObj["strikeThroughCheck"] = false;
                    } else {
                        modObj["strikeThroughCheck"] = true;
                    }
                } else {
                    modObj["strikeThroughCheck"] = false;
                }

                modObj["index"] = i;

                respData.activityDetails.push(modObj);
            }

        }
    }
    return (respData);

}
// for modify rank details data 
export function modifyRankDetails(data) {
    var respData = { "rankDetails": [] };
    if (data) {
        let rankDetails = data.response;
        if (rankDetails && rankDetails.length > 0) {

            for (let i = 0; i < rankDetails.length; i++) {
                let modObj = {};
                if (rankDetails[i].vendorId == undefined || rankDetails[i].vendorId == null) {
                    modObj["vendorId"] = "";
                } else {
                    modObj["vendorId"] = rankDetails[i].vendorId;
                }
                if (rankDetails[i].vendorName == undefined || rankDetails[i].vendorName == null) {
                    modObj["vendorName"] = "";
                } else {
                    modObj["vendorName"] = rankDetails[i].vendorName;
                }
                if (rankDetails[i].sumOfQuantity == undefined || rankDetails[i].sumOfQuantity == null) {
                    modObj["sumOfQuantity"] = "";
                } else {
                    modObj["sumOfQuantity"] = rankDetails[i].sumOfQuantity;
                }
                if (rankDetails[i].sumOfAmount == undefined || rankDetails[i].sumOfAmount == null) {
                    modObj["sumOfAmount"] = "";
                } else {
                    modObj["sumOfAmount"] = rankDetails[i].sumOfAmount;
                }
                if (rankDetails[i].price == undefined || rankDetails[i].price == null) {
                    modObj["price"] = "";
                } else {
                    modObj["price"] = rankDetails[i].price;
                }
                if (rankDetails[i].rankfieldvalue == undefined || rankDetails[i].rankfieldvalue == null) {
                    modObj["rankfieldvalue"] = "";
                } else {
                    modObj["rankfieldvalue"] = rankDetails[i].rankfieldvalue;
                }
                if (rankDetails[i].rank == undefined || rankDetails[i].rank == null) {
                    modObj["rank"] = "";
                } else {
                    modObj["rank"] = rankDetails[i].rank;
                }

                modObj["index"] = i;

                respData.rankDetails.push(modObj);
            }

        }
    }
    return (respData);



}