'use strict';

var Pharmacie = require('../models/PharmaciesModel');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

var PharmacieController = {

    //REGISTER PHARMACIE
    createPharmacie(req,res){
        var pharmacie = new Pharmacie();
        var params  = req.body;
        if(params.name && params.address && params.nit && params.city && params.email && params.password)
        {
            pharmacie.name = params.name;
            pharmacie.address = params.adddress;
            pharmacie.products = null;
            pharmacie.nit = params.nit;
            pharmacie.city = params.city;
            pharmacie.bussines_email = params.email;
            pharmacie.password = params.password;
            pharmacie.create_at = moment().unix();
            pharmacie.updated_at = moment().unix();
            Pharmacie.find({
                $or:[
                    {bussines_email:pharmacie.bussines_email},
                    {nit:pharmacie.nit},
                ]
            }).exec((err,findeds)=>{
                if(err)  return res.status(500).send({code:500,message:"Error internal server"})

                if(findeds && findeds.length>=1)
                {
                    return res.status(403).send({
                        code:403,
                        message:"Email or nit already exists"
                    })
                }else{
                    bcrypt.hash(params.password,null,null,(err,hashed)=>{
                        if(err) return res.status(500).send({
                            code:500,
                            message:'error internal serve'
                        })

                        pharmacie.password = hashed;
                        pharmacie.save((err,pharmaciecreated)=>{
                            if(err) return res.status(500).send({
                                code:500,
                                message:"Error internal server"
                            })

                            if(pharmaciecreated) return res.status(200).send({
                                code:200,
                                response:"Pharmacie created successfully",
                                Pharmacie:pharmaciecreated
                            })

                            if(!pharmaciecreated) return res.status(400).send({
                                message:"Pharmaice don't registry"
                            })
                        })
                    })
                }
            })

        }
    }
}


module.exports = PharmacieController;