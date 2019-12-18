'use strict'

var monngose  = require('mongoose');
var order  = require('./orderModel');
var Schema = monngose.Schema;

var userSchema = Schema({
    name:String,
    surname:String,
    role:String,
    pedidos:[order],
    email:String,
    role:String,
    city:String,
    address:String,
    password:String,
    status:Boolean,
    create_at:String,
    updated_at:String
})

module.exports= monngose.model('user',userSchema);