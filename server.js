const http = require('http');
const express = require('express');
const app = express();
const niceDnrCall = require('./niceDnrCall.js');
const bodyPaser = require('body-parser')

http.createServer(app).listen(40000, function(){
    console.log("Server Start at 40000");
});

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({
    extended : true
}));

app.post('/interface/nicednr', async function (req, res){
    let bodyData = req.body;

    let returnData = await niceDnrCall.niceDnrCall(bodyData);
    console.log(" =========================================== ");
    console.log(" returnData :: " + returnData);
    console.log(" =========================================== ");
    res.send(returnData);
})