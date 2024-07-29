// for modify fetching bidder list data 
export async function modifyBidderList(data) {
    var respData = { "totalCount": 0, "bidderList": [] };
    if (data) {
        let auctionList = data.response;
        // respData.totalCount = data.response.total;
        if (auctionList && auctionList.length > 0) {
            for (let i = 0; i < auctionList.length; i++) {
                let modObj = {};
                // for (let j = 0; j < auctionList[i].length; j++) {
                // check data vendorId
                if (auctionList[i].vendorId == undefined || auctionList[i].vendorId == null) {
                    modObj["id"] = "";
                } else {
                    modObj["id"] = auctionList[i].vendorId;
                }
                // check data vendorName
                if (auctionList[i].vendorName == undefined || auctionList[i].vendorName == null) {
                    modObj["vendorName"] = "";
                } else {
                    modObj["vendorName"] = auctionList[i].vendorName;
                }
                // check data sumOfQuantity
                if (auctionList[i].sumOfQuantity == undefined || auctionList[i].sumOfQuantity == null) {
                    modObj["sumOfQuantity"] = 0;
                } else {
                    modObj["sumOfQuantity"] = auctionList[i].sumOfQuantity;
                }
                // check data sumOfAmount
                if (auctionList[i].sumOfAmount == undefined || auctionList[i].sumOfAmount == null) {
                    modObj["sumOfAmount"] = 0;
                } else {
                    modObj["sumOfAmount"] = auctionList[i].sumOfAmount;
                }
                // check data price
                if (auctionList[i].price == undefined || auctionList[i].price == null) {
                    modObj["price"] = "";
                } else {
                    modObj["price"] = auctionList[i].price;
                }
                // check data rankfieldvalue
                if (auctionList[i].rankfieldvalue == undefined || auctionList[i].rankfieldvalue == null) {
                    modObj["rankfieldvalue"] = "";
                } else {
                    modObj["rankfieldvalue"] = auctionList[i].rankfieldvalue;
                }
                // check data rank
                if (auctionList[i].rank == undefined || auctionList[i].rank == null) {
                    modObj["rank"] = "";
                } else {
                    modObj["rank"] = auctionList[i].rank;
                }

                modObj["index"] = i;
                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.bidderList.push(modObj);
            }
        }
    }
    return (respData);
}
// for modify fetching product details data 
export async function modifyProductDetails(data) {

    var respData = { "productdetails": [] };
    if (data) {
        let auctionList = data.response;
        if (auctionList && auctionList.length > 0) {
            for (let i = 0; i < auctionList.length; i++) {
                let subAuctionArr = [];
                let modObj = {};
                for (let j = 0; j < auctionList[i].length; j++) {
                    // check data productid
                    if (auctionList[i][j].productid == undefined || auctionList[i][j].productid == null) {
                        modObj["id"] = "";
                    } else {
                        modObj["id"] = auctionList[i][j].productid;
                    }
                    // check data productdesc
                    if (auctionList[i][j].productdesc == undefined || auctionList[i][j].productdesc == null) {
                        modObj["productdesc"] = "";
                    } else {
                        modObj["productdesc"] = auctionList[i][j].productdesc;
                    }
                    // check data unitdesc
                    if (auctionList[i][j].unitdesc == undefined || auctionList[i][j].unitdesc == null) {
                        modObj["unitdesc"] = "";
                    } else {
                        modObj["unitdesc"] = auctionList[i][j].unitdesc;
                    }
                    // check data fieldvalue
                    if (auctionList[i][j].fieldvalue == undefined || auctionList[i][j].fieldvalue == null) {
                        modObj["fieldvalue"] = "";
                    } else {
                        modObj["fieldvalue"] = auctionList[i][j].fieldvalue;
                    }

                    // check data fielddesc
                    if (auctionList[i][j].fielddesc == "qtyrequired") {
                        modObj["requiredQty"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "auctionbaseprice") {
                        modObj["basePrice"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "auctiondeldate") {
                        modObj["auctionDeliveryDate"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "availableqty") {
                        modObj["availableQty"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "price") {
                        modObj["price"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "frieght") {
                        modObj["frieght"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "cgst") {
                        modObj["cgst"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "sgst") {
                        modObj["sgst"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "igst") {
                        modObj["igst"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "totalamt") {
                        modObj["totalAmount"] = auctionList[i][j].fieldvalue;
                    }
                    if (auctionList[i][j].fielddesc == "subamount") {
                        modObj["subAmount"] = auctionList[i][j].fieldvalue;
                    }
                }
                subAuctionArr.push(modObj)

                modObj["check"] = false;
                modObj["tick"] = false;
                modObj["showHide"] = false;
                respData.productdetails.push(modObj);
            }
        }
    }
    return (respData);
}

export async function modifySelectionCodeList(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].id;
            resArray[i]["name"] = resArray[i].selectioncode;
        }
    }
    return resArray;
}

