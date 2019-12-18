'use strict'

var jwt = require('jwt-simple');
var moment  = require('moment');
var screet = "key_don't secure"


exports.auth = (req,res,next) =>{
if(!req.headers.autorization)
{
    return res.status(403).send({response:"NO TIENE PERMISOS DE ACCESSO"});

}

var token  = req.headers.autorization.replace(/['"]+/g,'');
//DECODE TOKEN

try {
    var payload = jwt.decode(token,screet);
    if(payload.exp <= moment.unix())
    {
return res.status(401).send({message:"El token ha expirado"})
    }
    else{
        next();
    }
    
} catch (error) {
    return res.status(403).send({code:'403',message:"El token no es valido : "+error})
}

}