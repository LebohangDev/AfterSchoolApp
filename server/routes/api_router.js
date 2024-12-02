var express = require("express");
 // SETTING LIST OF APIS THAT ARE ALLOWED
 
var ALLOWED_IPS = [
    "127.0.0.1",
    "123.456.7.89"


];


var api = express.Router();
api.get("/Welcome", async(req, res)  =>{
    res.send("welcome to API Router")
})

api.use(async(req, res, next) =>{
    var userIsAllowed = ALLOWED_IPS.indexOf(req.ip) !== -1;
    if(!userIsAllowed){
        res.status(401).send("Access Denied");
    }else{
        next();
    }

})


module.exports = api;