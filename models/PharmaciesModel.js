'use strict'
var moongose = require('mongoose');
var Schema = moongose.Schema;

var PharmacieModel = Schema({
    name:String,
    address:String,
    products:Array,
    role:String,
    nit:Number,
    city:String,
    email:String,
    password:String,
    create_at:String,
    updated_at:String
    
})


module.exports  = moongose.model('pharmacie',PharmacieModel);