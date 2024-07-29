import { Toaster } from "../../services/common-view-function";

export function modifyCategoryData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].id == undefined || data[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = data[i].id
                }
                if (data[i].entityoptionvalue == undefined || data[i].entityoptionvalue == null) {
                    modObj["name"] = ""
                } else {
                    modObj["name"] = data[i].entityoptionvalue
                }

                respArr.push(modObj)

            }
        }
    }
    return respArr
}

export function modifyTypeData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].id == undefined || data[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = data[i].id
                }
                if (data[i].entityoptionvalue == undefined || data[i].entityoptionvalue == null) {
                    modObj["name"] = ""
                } else {
                    modObj["name"] = data[i].entityoptionvalue
                }

                respArr.push(modObj)

            }
        }
    }
    return respArr
}

export function modifyProductData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].id == undefined || data[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = data[i].id
                }
                if (data[i].gst == undefined || data[i].gst == null) {
                    modObj["gst"] = ""
                } else {
                    modObj["gst"] = data[i].gst
                }

                if (data[i].productdesc == undefined || data[i].productdesc == null) {
                    modObj["name"] = ""
                } else {
                    modObj["name"] = data[i].productdesc
                }
                if (data[i].unitdesc == undefined || data[i].unitdesc == null) {
                    modObj["unitdesc"] = ""
                } else {
                    modObj["unitdesc"] = data[i].unitdesc
                }

                respArr.push(modObj)

            }
        }
    }
    return respArr
}


export function modifyVendorData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].vendorid == undefined || data[i].vendorid == null) {
                    modObj["vendorid"] = ""
                } else {
                    modObj["vendorid"] = data[i].vendorid
                }
                if (data[i].vendorname == undefined || data[i].vendorname == null) {
                    modObj["vendorname"] = ""
                } else {
                    modObj["vendorname"] = data[i].vendorname
                }
                modObj["check"] = false

                respArr.push(modObj)
            }
        }
    }
    return respArr
}

export function modProductFieldData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].id == undefined || data[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = data[i].id
                }
                if (data[i].productid == undefined || data[i].productid == null) {
                    modObj["productid"] = ""
                } else {
                    modObj["productid"] = data[i].productid
                }
                if (data[i].fieldlabeldesc == undefined || data[i].fieldlabeldesc == null) {
                    modObj["fieldlabeldesc"] = ""
                } else {
                    modObj["fieldlabeldesc"] = data[i].fieldlabeldesc
                }
                if (data[i].fielddesc == undefined || data[i].fielddesc == null) {
                    modObj["fielddesc"] = ""
                } else {
                    modObj["fielddesc"] = data[i].fielddesc
                }
                if (data[i].fieldvalue == undefined || data[i].fieldvalue == null) {
                    modObj["fieldvalue"] = ""
                } else {
                    modObj["fieldvalue"] = data[i].fieldvalue
                }
                if (data[i].isprimarykey == undefined || data[i].isprimarykey == null) {
                    modObj["isprimarykey"] = ""
                } else {
                    modObj["isprimarykey"] = data[i].isprimarykey
                }
                if (data[i].serialno == undefined || data[i].serialno == null) {
                    modObj["serialno"] = ""
                } else {
                    modObj["serialno"] = data[i].serialno
                }

                respArr.push(modObj)

            }
        }
    }
    return respArr
}


export function modAuctionFieldData(data) {
    let respArr = [];
    if (data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let modObj = {};
                if (data[i].id == undefined || data[i].id == null) {
                    modObj["id"] = ""
                } else {
                    modObj["id"] = data[i].id
                }
                if (data[i].templateid == undefined || data[i].templateid == null) {
                    modObj["templateid"] = ""
                } else {
                    modObj["templateid"] = data[i].templateid
                }
                if (data[i].entitytypeid == undefined || data[i].entitytypeid == null) {
                    modObj["entitytypeid"] = ""
                } else {
                    modObj["entitytypeid"] = data[i].entitytypeid
                }
                if (data[i].fieldid == undefined || data[i].fieldid == null) {
                    modObj["fieldid"] = ""
                } else {
                    modObj["fieldid"] = data[i].fieldid
                }
                if (data[i].fieldlabeldesc == undefined || data[i].fieldlabeldesc == null) {
                    modObj["fieldlabeldesc"] = ""
                } else {
                    modObj["fieldlabeldesc"] = data[i].fieldlabeldesc
                }
                if (data[i].isrequired == undefined || data[i].isrequired == null) {
                    modObj["isrequired"] = ""
                } else {
                    modObj["isrequired"] = data[i].isrequired
                }
                if (data[i].permission == undefined || data[i].permission == null) {
                    modObj["permission"] = ""
                } else {
                    modObj["permission"] = data[i].permission
                }
                if (data[i].fieldtype == undefined || data[i].fieldtype == null) {
                    modObj["fieldtype"] = ""
                } else {
                    modObj["fieldtype"] = data[i].fieldtype
                }
                if (data[i].isDetailedView == undefined || data[i].isDetailedView == null) {
                    modObj["isDetailedView"] = ""
                } else {
                    modObj["isDetailedView"] = data[i].isDetailedView
                }

                respArr.push(modObj)

            }
        }
    }
    return respArr
}

export function setArrData(productData, auctionData, stateData) {
    let respData = { respArrData: [], productName: {}, productCode: {}, productDesc: {}, isDelete: false, isShowHide: false }
    let respArrData = []
    let respArr = productData.concat(auctionData);
    // for (let i = 0; i < respArr.length; i++) {
    //     if (respArr[i].fieldlabeldesc == "Product/Item Code") {
    //         respArrData.push(respArr[i])
    //     }

    //     if (respArr[i].fieldlabeldesc == "Quantity Required") {
    //         let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 3 })
    //         respArrData.push(modObj)
    //     }
    //     if (respArr[i].fieldlabeldesc == "Base Price") {
    //         let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 4 })
    //         respArrData.push(modObj)
    //     }
    //     if (respArr[i].fieldlabeldesc == "Auction Delivery Date") {
    //         let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 5 })
    //         respArrData.push(modObj)
    //     }
    //     if (respArr[i].fieldlabeldesc == "Auction Tick Size (%)") {
    //         let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 6 })
    //         respArrData.push(modObj)
    //     }
    //     if (respArr[i].fieldlabeldesc == "Product/Item Description") {
    //         respArrData.push(respArr[i])
    //     }

    // }
    // respArrData.push(
    //     { "fieldlabeldesc": "Product/Item", "fieldvalue": stateData.selectedProduct.name },
    //     { "fieldlabeldesc": "Unit", "fieldvalue": stateData.selectedProduct.unitdesc, slNo: 1 },
    //     { "fieldlabeldesc": "GST", "fieldvalue": stateData.selectedProduct.gst, slNo: 2 },
    // )

    respData.productName = { "fieldlabeldesc": "Product/Item", "fieldvalue": stateData.selectedProduct.name };
    respData.respArrData.push({ "fieldlabeldesc": "Unit", "fieldvalue": stateData.selectedProduct.unitdesc, slNo: 1 },
        { "fieldlabeldesc": "GST", "fieldvalue": stateData.selectedProduct.gst, slNo: 2 },)

    for (let i = 0; i < respArr.length; i++) {
        if (respArr[i].fieldlabeldesc == "Product/Item Code") {
            respData.productCode = respArr[i]
        }
        if (respArr[i].fieldlabeldesc == "Quantity Required") {
            let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 3 })
            respData.respArrData.push(modObj)
        }
        if (respArr[i].fieldlabeldesc == "Base Price") {
            let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 4 })
            respData.respArrData.push(modObj)
        }
        if (respArr[i].fieldlabeldesc == "Auction Delivery Date") {
            let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 5, visibleDatePicker: false, rawDate: new Date() })
            respData.respArrData.push(modObj)
        }
        if (respArr[i].fieldlabeldesc == "Auction Tick Size (%)") {
            let modObj = Object.assign(respArr[i], { fieldvalue: "", slNo: 6 })
            respData.respArrData.push(modObj)
        }
        if (respArr[i].fieldlabeldesc == "Product/Item Description") {
            respData.productDesc = respArr[i]
        }
    }

    // console.log("modarrrDatat----", respData)

    return respData

}

export function getAuctionData(data) {
    console.log("data for auction----:::", JSON.stringify(data));
    let respData = [];

    if (data) {
        // Add a static entry
        // respData.respArrData.push({ "fieldlabeldesc": "Unit" });

        // Iterate over the data and add matching objects
        for (let i = 0; i < data.length; i++) {
            if (data[i].fieldlabeldesc == "Auction Start Date") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 1, visibleDatePicker: false, rawDate: new Date(), isprimarykey: "0", isReminderView: "0", fielddesc: "auctiondate" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Auction Start Time") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 2, visibleDatePicker: false, rawDate: new Date(), isprimarykey: "0", isReminderView: "0", fielddesc: "auctiontime" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Auction End Date") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 3, visibleDatePicker: false, rawDate: new Date(), isprimarykey: "0", isReminderView: "0", fielddesc: "auctionenddate" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Auction End Time") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 4, visibleDatePicker: false, rawDate: new Date(), isprimarykey: "0", isReminderView: "0", fielddesc: "auctionendtime" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Extra Closing Duration") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 5, isprimarykey: "0", isReminderView: "0", fielddesc: "extraclosingduration" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Bidder View Permission") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 6, isprimarykey: "0", isReminderView: "0", fielddesc: "bidderview" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Shipment From") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 7, isprimarykey: "0", isReminderView: "0", fielddesc: "Shipment From" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Shipment To") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 8, isprimarykey: "0", isReminderView: "0", fielddesc: "Shipment To" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Received QTY(MT)") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 9, isprimarykey: "0", isReminderView: "0", fielddesc: "Received QTY(MT)" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Ref Id") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 10, isprimarykey: "0", isReminderView: "0", fielddesc: "Ref Id" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Delivery Instruction") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 11, isprimarykey: "0", isReminderView: "0", fielddesc: "deliveryinstruction" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Auction Description") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 12, isprimarykey: "0", isReminderView: "0", fielddesc: "auctiondesc" })
                respData.push(modObj);
            }
            if (data[i].fieldlabeldesc == "Auction Name/Code") {
                let modObj = Object.assign(data[i], { fieldvalue: "", slNo: 13, isprimarykey: "1", isReminderView: "0", fielddesc: "auctionname" })
                respData.push(modObj);
            }
        }
    }

    let mainArr = getAscendingOrder(respData);

    return mainArr;
}

function getAscendingOrder(data) {
    data.sort((item1, item2) => item1.slNo - item2.slNo);
    return data;
}

export function getBidderPermData(data) {
    let respArr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].fieldid == "61" && data[i].fieldlabeldesc == "Bidder View Permission") {
                for (let j = 0; j < data[i].predifinevalue.length; j++) {
                    let modObj = {};
                    if (data[i].predifinevalue[j].id == undefined || data[i].predifinevalue[j].id == null) {
                        modObj["id"] = ""
                    } else {
                        modObj["id"] = data[i].predifinevalue[j].id
                    }
                    if (data[i].predifinevalue[j].entityoptionvalue == undefined || data[i].predifinevalue[j].entityoptionvalue == null) {
                        modObj["name"] = ""
                    } else {
                        modObj["name"] = data[i].predifinevalue[j].entityoptionvalue
                    }
                    respArr.push(modObj)
                }
            }
        }
    }
    return respArr;
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

export function modProductData(data) {
    // console.log("data:::::----", JSON.stringify(data));

    // Initialize an empty array to hold the combined result
    let mainArray = [];

    // Process each item in the data array
    data.forEach(item => {
        // Extract respArrData and the additional objects
        const { respArrData, productName, productCode, productDesc } = item;

        // Create a new array including productName, productCode, productDesc, and the existing respArrData
        const modifiedRespArr = [productName, productCode, productDesc, ...respArrData];

        // Add the modifiedRespArr to the main array
        mainArray.push(modifiedRespArr);
    });
    // console.log("mainARrayyyyy--====", JSON.stringify(mainArray));
    // Return the combined main array
    return mainArray;
}

export function validateReqData(data) {
    console.log("data.auctyion---===", JSON.stringify(data.auction));
    let isValid = true;

    for (let i = 0; i < data.product.length; i++) {
        isValid = validateProductData(data.product[i]);
        if (!isValid) {
            return false;
            // break;
        }
    }
    isValid = validateVendorData(data.vendor);
    if (!isValid) {
        return false;
    }
    if (!validateAuctionData(data.auction)) {
        return false;
    }

    return isValid;
}

function validateProductData(productData) {
    for (let i = 0; i < productData.length; i++) {
        const field = productData[i];
        if (field.fieldlabeldesc == "Quantity Required" && (field.fieldvalue == null || field.fieldvalue == undefined || field.fieldvalue.length == 0)) {
            Toaster.ShortCenterToaster(`Please enter ${field.fieldlabeldesc} !`);
            return false;
        } else if (field.fieldlabeldesc == "Base Price" && (field.fieldvalue == null || field.fieldvalue == undefined || field.fieldvalue.length == 0)) {
            Toaster.ShortCenterToaster(`Please enter ${field.fieldlabeldesc} !`);
            return false;
        } else if (field.fieldlabeldesc == "Auction Delivery Date" && (field.fieldvalue == null || field.fieldvalue == undefined || field.fieldvalue.length == 0)) {
            Toaster.ShortCenterToaster(`Please enter ${field.fieldlabeldesc} !`);
            return false;
        } else if (field.fieldlabeldesc == "Auction Tick Size (%)" && (field.fieldvalue == null || field.fieldvalue == undefined || field.fieldvalue.length == 0)) {
            Toaster.ShortCenterToaster(`Please enter ${field.fieldlabeldesc} !`);
            return false;
        }
    }

    return true;
}

function validateVendorData(vendorData) {
    if (vendorData == null || vendorData == undefined || vendorData.length == 0) {
        Toaster.ShortCenterToaster(`Please select vendor !`);
        return false;
    }

    return true;
}

function validateAuctionData(auctionData) {
    for (let i = 0; i < auctionData.length; i++) {
        const field = auctionData[i];
        if (field.fieldlabeldesc != "Auction Name/Code") {
            if (field.fieldvalue == null || field.fieldvalue == undefined || field.fieldvalue.length == 0) {
                Toaster.ShortCenterToaster(`Please enter ${field.fieldlabeldesc} !`);
                return false;
            }
        }
    }

    return true;
}

export function modBidderData(data) {
    let respArr = [];
    for (let i = 0; i < data.length; i++) {
        let modObj = {};
        modObj["id"] = data[i].id;
        modObj["entityoptionvalue"] = data[i].name;
        modObj["check"] = data[i].check;
        respArr.push(modObj);
    }

    return respArr;
}


// export function modAuctionData(data) {
//     console.log("datadatadata::::", JSON.stringify(data));
//     let auctionData = data;
//     if (data) {
//         for (let i = 0; i < data.length; i++) {
//             let modObj = {};
//             if (data[i].fieldlabeldesc == "Auction Start Date") {
//                 modObj["id"] = data[i].id;
//                 modObj["templateid"] = data[i].templateid;
//                 modObj["entitytypeid"] = data[i].entitytypeid;
//                 modObj["fieldid"] = "56";
//                 modObj["fieldlabeldesc"] = data[i].fieldlabeldesc;
//                 modObj["isrequired"] = data[i].isrequired;
//                 modObj["permission"] = data[i].permission;
//                 modObj["fieldtype"] = data[i].fieldtype;
//                 modObj["isDetailedView"] = data[i].isDetailedView;
//                 modObj["fieldvalue"] = getTimeStamp(data[i].rawDate);
//                 modObj["slNo"] = data[i].slNo;
//                 modObj["visibleDatePicker"] = data[i].visibleDatePicker;
//                 modObj["rawDate"] = data[i].rawDate;
//                 modObj["isprimarykey"] = data[i].isprimarykey;
//                 modObj["isReminderView"] = data[i].isReminderView;
//                 modObj["fielddesc"] = data[i].fielddesc;
//             }
//             auctionData.push(modObj);
//         }
//     }
//     // auctionData.push(data[0]);
//     console.log("auctionData::::", JSON.stringify(auctionData));
//     return auctionData;
// }

// function getTimeStamp(rawDate) {

//     // Convert to a Date object
//     const dateObject = new Date(rawDate);

//     // Get the timestamp
//     const timestamp = dateObject.getTime();

//     return timestamp

// }

export function modAuctionData(data) {
    console.log("datadatadata::::", JSON.stringify(data));
    let auctionData = [...data]; // Create a copy of the data array

    let auctionStartDate = null;
    let auctionEndDate = null;

    // Find the auction start and end dates
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].fieldlabeldesc === "Auction Start Time") {
                auctionStartDate = data[i];
            }
            if (data[i].fieldlabeldesc === "Auction End Time") {
                auctionEndDate = data[i];
            }
        }
    }

    // Create new objects only if both start and end dates are found
    if (auctionStartDate && auctionEndDate) {
        const newObjects = [
            {
                ...auctionStartDate,
                fieldid: "55",
                fieldlabeldesc: "Auction Start Date",
                fieldvalue: getTimeStamp(auctionStartDate.rawDate)
            },
            {
                ...auctionEndDate,
                fieldid: "56",
                fieldlabeldesc: "Auction Start Date",
                fieldvalue: getTimeStamp(auctionEndDate.rawDate)
            },
            {
                ...auctionEndDate,
                fieldid: "57",
                fieldlabeldesc: "Auction Start Date",
                fieldvalue: getTimeStamp(auctionEndDate.rawDate)
            }
        ];

        auctionData = [...auctionData, ...newObjects];
    }

    console.log("auctionData::::", JSON.stringify(auctionData));
    return auctionData;
}

function getTimeStamp(rawDate) {
    const dateObject = new Date(rawDate);
    return dateObject.getTime();
}
