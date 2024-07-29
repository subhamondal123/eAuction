import { getData, singleRemove, storeData } from "../async-storage";

export const allStorageVariable = [
    "userCredential",
    "roleData"
]

export async function userCredential(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("userCredential", data);
            }
            return true;
        case "get":
            return await getData("userCredential");

        default:
            return true;
    }
}

export async function roleData(data, type) {
    switch (type) {
        case "store":
            if (data) {
                await storeData("roleData", data);
            }
            return true;
        case "get":
            return await getData("roleData");

        default:
            return true;
    }
}

