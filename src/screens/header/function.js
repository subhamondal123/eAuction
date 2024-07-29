// for modify user data 
export function modifyUserData(data) {
    let modObj = {};
    if (data) {
        // check data clientid
        if (data.clientid == undefined || data.clientid == null) {
            modObj["clientid"] = "";
        } else {
            modObj["clientid"] = data.clientid;
        }
        // check data entityfieldmasterid
        if (data.entityfieldmasterid == undefined || data.entityfieldmasterid == null) {
            modObj["entityfieldmasterid"] = "";
        } else {
            modObj["entityfieldmasterid"] = data.entityfieldmasterid;
        }
        // check data entityfieldmastername
        if (data.entityfieldmastername == undefined || data.entityfieldmastername == null) {
            modObj["entityfieldmastername"] = "";
        } else {
            modObj["entityfieldmastername"] = data.entityfieldmastername;
        }
        // check data entitytypeid
        if (data.entitytypeid == undefined || data.entitytypeid == null) {
            modObj["entitytypeid"] = "";
        } else {
            modObj["entitytypeid"] = data.entitytypeid;
        }
        // check data id
        if (data.id == undefined || data.id == null) {
            modObj["id"] = "";
        } else {
            modObj["id"] = data.id;
        }
        // check data roleId
        if (data.roleId == undefined || data.roleId == null) {
            modObj["roleId"] = "";
        } else {
            modObj["roleId"] = data.roleId;
        }
        // check data rolename
        if (data.rolename == undefined || data.rolename == null) {
            modObj["rolename"] = "";
        } else {
            modObj["rolename"] = data.rolename;
        }
        // check data useremail
        if (data.useremail == undefined || data.useremail == null) {
            modObj["useremail"] = "";
        } else {
            modObj["useremail"] = data.useremail;
        }
        // check data userfirstname
        if (data.userfirstname == undefined || data.userfirstname == null) {
            modObj["userfirstname"] = "";
        } else {
            modObj["userfirstname"] = data.userfirstname;
        }
        // check data userlastname
        if (data.userlastname == undefined || data.userlastname == null) {
            modObj["userlastname"] = "";
        } else {
            modObj["userlastname"] = data.userlastname;
        }
        // check data userloginid
        if (data.userloginid == undefined || data.userloginid == null) {
            modObj["userloginid"] = "";
        } else {
            modObj["userloginid"] = data.userloginid;
        }
        // check data usermobile
        if (data.usermobile == undefined || data.usermobile == null) {
            modObj["usermobile"] = "";
        } else {
            modObj["usermobile"] = data.usermobile;
        }
    }
    return modObj
}