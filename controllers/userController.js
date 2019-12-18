'use strict';

var userModel = require('../models/Usermodel');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');


var userController = {

registerUser(req,res){
var newuser = new userModel();
var params  = req.body;
if(params.name && params.surname  && params.email && params.city
&& params.address && params.password ){

    newuser.name = params.name;
    newuser.surname = params.surname;
    newuser.email = params.email;
    newuser.role  = "Client";
    newuser.city = params.city;
    newuser.address  = params.address;
    newuser.password  = params.password;
    newuser.status = false;
    newuser.create_at = moment().unix();
    newuser.updated_at = moment().unix();
    // DON'T REPEAT USERS
    //  THIS RETURN A PROMISE WITH EXEC
    userModel.find({
        $or:[
            {email:newuser.email},
        ]
    }).exec((err,findeds)=>{
        if(err) return res.status(500).send({
            code:'500',
            response:"query not made"
        })

        if(findeds && findeds.length >=1)
        {
            return res.status(403).send({
                code:'403',
                response:'it user already exists'
            })
        }
        else {
            bcrypt.hash(params.password,null,null,(err,hashed)=>{
                if (err) return res.status(500).send({
                    response:"Key don't hashed"
                })

                newuser.password = hashed;
                newuser.save((err,created)=>{
                    if(err) return res.status(500).send({
                        response:"User don't created"
                    })

                    if(created)
                    {
                        return res.status(200).send({
                            code:200,
                            response:"User created successfully"+created
                        })
                    }
                    else{
                            return res.status(400).send({
                                response:"user don't created"
                            })
                    }
                })
            })
        }    

    })

}
else{
    return res.status(403).send({
        code:'403',
        response:'Please fill all fields'
    })
}


},

AuthLogin(req,res){
    var params = req.body;
    var email  = params.email;
    var password = params.password;
    if(email&&password)
    {
        userModel.findOne({
            $or:[
                {email:email}
            ]
        })
        .exec((err,finded)=>{
            if(err) return res.status(500).send({
                code:'500',
                response:"Error to find user"
            })


            if(finded){
                bcrypt.compare(password,finded.password,(err,validated)=>{
                    if(err) return res.status(500).send({
                        code:'500',
                        response:"Error to validated user"
                    })

                    if(validated)
                    {
                        finded.password = undefined;
                        res.status(200).send({
                            code:200,
                            message:'User authenticated successfully',
                            token:jwt.createToken(finded)
                        })
                    }else{
                        return res.status(404).send({
                         message:"Error email or password invalid"
                        })
                    }
                })
            }
            else{
                return res.status(404).send({
                    message:"User not found"
                })
            }
        })

    }
    else{
        return res.status(403).send({
            code:'403',
            response:'Please fill all fields'
        })
    }



}


}





module.exports = userController;