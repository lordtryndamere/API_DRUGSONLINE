'use strict';

var Pharmacie = require('../models/PharmaciesModel');
var mongoosePaginate = require('mongoose-pagination');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
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
            pharmacie.role = "Pharmacie";
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
    },
    authpharmacie(req,res){
        var params = req.body;
        var email = params.email;
        var password = params.password;

        if(email&&password)
        {
        Pharmacie.findOne({
            $or:[
                {bussines_email:email}
            ]
        }).exec((err,userfined)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            })

            if(userfined)
            {
                bcrypt.compare(password,userfined.password,(err,validated)=>{
                    if(err) return res.status(200).send({
                        code:500,
                        response:"Error internal server"
                    })

                    if(validated)
                    {
                        userfined.password = undefined;
                        return res.status(200).send({
                            code:200,
                            response:"User authenticated succesfully",
                            token:jwt.createToken(userfined)
                        })
                    }else{
                        return res.status(404).send({
                            code:404,
                            response:"Error user or password invalid"
                        })
                    }
                })
            }
            else{
                return res.status(404).send({
                    code:404,
                    responswe:"Error user not found"
                })
            }
        })

        }else{
            return res.status(401).send({
                code:401,
                response:"Please fill all fields"
            })
        }
    },
    getPharmacie(req,res){
        var id = req.params.id
        Pharmacie.findById(id,(err,response)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            });

            if(!response) return res.status(404).send({
                code:404,
                response:"Error pharmice not found"
            })

            if(response) return res.status(200).send({
                code:200,
                response:"Pharmacie finded successfully",
                pharmacie:response
            })
        })
    },
    getPharmacies(req,res){
        var page  = 1
        var itemPerpage = 10
        if(req.params.page)
        {
          page= req.params.page
        }
        Pharmacie.find({}).paginate(page,itemPerpage,(err,findeds)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            })

            if(!findeds) return res.status(404).send({
                code:404,
                response:"Pharmacies not founds"
            })

            if(findeds) return res.status(200).send({
                code:200,
                response:"Pharmacies findes successfully",
                Pharmacies:findeds
            })

         })


    },
    deletePharmacie(req,res){
    var id = req.params.id
    if(req.params.id){
        Pharmacie.findByIdAndDelete(id,(err,deleted)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            })

            if(!deleted) return res.status(404).send({
                code:404,
                response:"Pharmacie not found"
            })

            if(deleted) return res.status(200).send({
                code:200,
                response:"Pharmacie deleted successfully"
            })
         })
    }else{
        return res.status(401).send({
            code:401,
            response:"Plese put id param of pharmacie"
        })
    }

    },

    updatePharmacie(req,res){
        var params = req.body
        var id_pharmacie = req.params.id
        if(params){
            Pharmacie.findByIdAndUpdate(id,id_pharmacie,{new:true},(err,updated)=>{
                if (err) return res.status(500).send({
                    code:500,
                    response:"Error internal server"
                })

                if(!updated) return res.status(404).send({
                    code:404,
                    response:"Error pharmacie not found"
                })

                if(updated) return res.status(200).send({
                    code:200,
                    response:"Pharmice updated susccesfully",
                    pharmacie:updated
                })
            })
        }
    },

    
}


module.exports = PharmacieController;