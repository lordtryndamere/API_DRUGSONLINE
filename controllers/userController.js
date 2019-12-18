'use strict';

var userModel = require('../models/Usermodel');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var jwt= require('jwt-simple');


var userController = {

registerUser(req,res){
var newuser = new userModel();
var params  = req.body;
if(params.name && params.surname  && params.email && params.city
&& params.address && params.password ){

    newuser.name = params.name;
    newuser.surname = params.surname;
    newuser.email = params.surname;
    newuser.role  = "Client";
    newuser.city = params.city;
    newuser.address  = params.address;
    newuser.password  = params.password;
    newuser.status = false;
    newuser.create_at = moment().unix();
    newuser.updated_at = moment().unix();

}
else{
    return res.status(403).send({
        code:'403',
        response:"Por favor rellena todos los campos"
    })
}


},


}





module.exports = userController;