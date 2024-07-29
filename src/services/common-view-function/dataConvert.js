export function modifyObjToDynamicArr(alldata, dividesBy) {
    let tempArr = [];
    let modData = [];
    let indexCount = 0;
    if(dividesBy){
        dividesBy = dividesBy;
    } else {
        dividesBy = 2;
    }
    for (var key of Object.keys(alldata)) {
        tempArr = [...tempArr, ...[{"name":key, "value":alldata[key]}]];
        indexCount++;
    }
    if(tempArr !== undefined && tempArr.length > 0 && tempArr.length == indexCount){
            let divission = parseInt(tempArr.length / dividesBy);
            let reminder = parseInt(tempArr.length % dividesBy);
            for(let i=0;i<divission;i++){
                let subDivArr = [];
                for(let j=0;j<dividesBy;j++){
                    subDivArr.push(tempArr[i*dividesBy + j]);
                }
                modData.push(subDivArr);
            }
            if(reminder > 0){
                let reminderArr = [];
                for(let i=0;i<reminder;i++){
                    reminderArr.push(tempArr[(divission*dividesBy) + i]);
                }
                modData.push(reminderArr);
            }
    }
    return modData;
}