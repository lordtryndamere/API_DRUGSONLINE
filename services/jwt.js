'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "key_don't secure"


exports.createToken = (user)=>{
var payload = {
    sub: user._id,
    name :user.name,
    role : user.role,
    exp: moment().add(30,'days').unix()
}
return jwt.encode(payload,secret)
};  