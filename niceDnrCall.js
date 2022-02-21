import jsonUtils from "./jsonUtils.js"
import Axios from "./Axios.js"
import Axios2 from "./Axios2.js"

console.log("start")

let kindOf = "";
let url = 'https://niceab.nicednr.co.kr/carInfos';

let niceDnrCall = (data) => {
    kindOf = data.kindOf;
    let reqData;
    let returnData;

    //차량원회시세조회
    if(kindOf === "66") {
        reqData = setBodyData66(data);
        returnData = Axios2.axiosPost2(url, reqData, partsAndSiseCallback);
    }
    // 신차DB 적재
    else if(kindOf === "4096") {
    }

    console.log(" niceDnrCall :: " + returnData );

    if(returnData !== undefined) {
        return returnData;
    }
}

let setBodyData66 = (bodyData) => {
    // let ownerNm = "안영찬";
    // let vhrNo = "299거8869";
    // let kindOf = "66";

    let ownerNm =  bodyData.ownerNm;
    let vhrNo = bodyData.vhrNo;


    let data = {
        "apiKey": "D81B4A66BED2C6F38272CBD88262E642",
        "chkSec": "20220117170010",
        "chkKey": "78",
        "loginId": "pincar",
        "kindOf": kindOf,
        "ownerNm": ownerNm,
        "vhrNo": vhrNo
    };

    return data;
}

let partsAndSiseCallback = (response) => {
    let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    let responseData = response.data;

    let returnData = {
        resultCode : responseData.resultCode,
        resultMsg : responseData.resultMsg
    };

    console.log("resultCode :: " + returnData.resultCode);

    // 차량원부 + 시세 조회
    if (returnData.resultCode === "0000") {
        console.log("success!");
        returnData.carParts = carParts(responseData);
        returnData.carSise = carSise(responseData);
        console.log(" returnData :: " + jsonUtils.jsonMapToString(returnData));
    }

    else if(returnData.resultCode === "5000") {
        console.log(" * 시세 오류 :: " + returnData.resultMsg);
    }

    else{
        console.log("failed");
        console.log("** resultMessage :: " + returnData.resultMsg);
    }

    return returnData;
};

let carParts = (responseData) => {
    let returnData = {};
    let responseMapName = "out" + responseData.carParts.svcCd;

    let carParts = responseData.carParts[responseMapName];

    console.log("================================================")
    console.log(" ** 응답 원부내용 : " + jsonUtils.jsonMapToString(carParts));

    let returnCarParts = {
        //외장색상
        "resColor" : carParts.list[0].resColor,
        //차대번호
        "resVehicleIdNo" : carParts.list[0].resVehicleIdNo,
        //연식
        "resCarYearModel" : carParts.list[0].resCarYearModel,
        //최초등록일자
        "resRegisterDate" : carParts.list[0].resContentsList[0].resRegisterDate,
        //주행거리
        "resValidDistance" : carParts.list[0].resValidDistance
    }
    returnData = returnCarParts;
    return returnData;
}

let carSise = (responseData) => {
    let returnData = {};

    let carSise = responseData.carSise;

    console.log("================================================")
    console.log(" ** 응답 시세내용 : " + jsonUtils.jsonMapToString(carSise));

    let returnCarSise = {
        //브랜드번호
        "makerId"        : carSise.info.carinfo.makerId,
        //브랜드명
        "makerNm"        : carSise.info.carinfo.makerNm,
        //판매가격
        "salePrice"      : carSise.info.carinfo.salePrice,
        //차종번호
        "modelId"        : carSise.info.carinfo.modelId,
        //차종명
        "modelNm"        : carSise.info.carinfo.modelNm,
        //대표차종명
        "classModelNm"   : carSise.info.carinfo.classModelNm,
        //대표차종아이디
        "classModelId"   : carSise.info.carinfo.classModelId,
        //연료
        "fuel"           : carSise.info.carinfo.fuel,
        //대표차종이미지 URL
        "classModelImg"  : carSise.info.carinfo.classModelImg,
        //수입여부
        "importYn"       : carSise.info.carinfo.importYn,
        //엔진형식
        "engineType"     : carSise.info.carinfo.engineType,
        //연식
        "yearType"       : carSise.info.carinfo.yearType,
        //(정의서에 정의되어있지않음)
        "ciyYearType"    : carSise.info.carinfo.ciyYearType,
        //차급
        "shapeCategory"  : carSise.info.carinfo.shapeCategory,
        //엔진사이즈
        "engineSize"     : carSise.info.carinfo.engineSize,
        //연식
        "prye"           : carSise.info.carinfo.prye,
        //장착변속기
        "gearBox"        : carSise.info.carinfo.gearBox,
        //차대번호
        "vinNum"         : carSise.info.carinfo.vinNum,
        //승차정원
        "seatingCapacity": carSise.info.carinfo.seatingCapacity
    }
    returnData = returnCarSise;

    return returnData;
}

console.log("end")

export{
    niceDnrCall
}