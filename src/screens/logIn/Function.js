import { Toaster } from "../../services/common-view-function";
import { DataValidator } from "../../validators";
import { validate as validateEmail } from 'email-validator';

export function modifyDataBeforeLogin(data) {

    let resp = {
        isValidated: false,
        stateObj: {
            userIdError: false,
            passwordError: false
        }
    }

    let errCounter = 0;

    // if (DataValidator.emailValidator(data.email) == false) {
    if (data.userId == undefined || data.userId == null || data.userId.length == 0) {
        Toaster.ShortCenterToaster("Please enter username, email or phone no")
        resp.stateObj.userIdError = true;
        errCounter++;
    }
    if (errCounter == 0) {
        resp.isValidated = true;
    }

    return resp;
}

// for emmail validate
export function emailModValidator(email) {
    if (email === undefined || email === null) {
        return false;
    } else {
        if (email.length === 0) {
            return false;
        } else {
            if (validateEmail(email)) {   // validate the email by email-validator module
                return true;
            } else {
                return false;
            }
        }
    }
};

export function modifyArrRoleData(data) {
    let resArray = [];
    if (data && data.length > 0) {
        resArray = data;
        for (let i = 0; i < resArray.length; i++) {
            resArray[i]["id"] = resArray[i].roleid;
            resArray[i]["name"] = resArray[i].rolename;
        }
    }
    return resArray;
}