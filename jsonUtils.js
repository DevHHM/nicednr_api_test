
let jsonString = (jsonData) => {
    return JSON.stringify(jsonData);
}

let jsonMapToString = (jsonData) => {
    return "\n" + JSON.stringify(jsonData).replace(/,/gi, "\n").replace(/"/gi, "");
}

export default {
    jsonString : jsonString,
    jsonMapToString : jsonMapToString
}