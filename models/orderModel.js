'use strict'

var monngose  = require('mongoose');
var moment = require('moment')
var Schema = monngose.Schema;
var orderSchema = Schema({
    name_product:String,
    id_user_pedido:[{type:Schema.Types.ObjectId,ref:'user'}],
    hour_request:{type:Date, defaulthour:moment().unix()},
    class_product:String,
    status:Boolean
})

module.exports = monngose.model('pedido',orderSchema);