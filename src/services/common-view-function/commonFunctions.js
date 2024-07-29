export function modifyArrIntoTwoObjArrList(detailData) {
    let modData = [];
    let dividesBy = 2;
    if (detailData !== undefined && detailData.length > 0) {
        let divission = parseInt(detailData.length / dividesBy);
        let reminder = parseInt(detailData.length % dividesBy);
        for (let i = 0; i < divission; i++) {
            let subDivArr = [];
            for (let j = 0; j < dividesBy; j++) {
                subDivArr.push(detailData[i * dividesBy + j]);
            }
            modData.push(subDivArr)
        }
        if (reminder > 0) {
            let reminderArr = [];
            for (let i = 0; i < reminder; i++) {
                reminderArr.push(detailData[(divission * dividesBy) + i]);
            }
            modData.push(reminderArr)
        }
    }
    return modData;
}

export function textTruncate(stringValue,maxlength){
    if (stringValue.length > maxlength) {
        return stringValue.slice(0, maxlength) + "...";
      } else {
        return stringValue;
      }
}


export function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}