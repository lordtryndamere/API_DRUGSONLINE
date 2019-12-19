var Order = require('../models/orderModel');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var orderController = {
 
   createOrder(req,res){
    var order = new Order();
    var params = req.body;
    if(params.nombre && params.status && params.clase)
    {
        order.name_product = params.nombre;
        order.class_product = params.clase;
        order.status = false;
        order.create_at = moment().unix();
        order.updated_at = moment().unix();
        order.save((err,ordersave)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            })

            if(!ordersave) return res.status(404).send({
                code:404,
                response:"Error internal server"
            })

            if(ordersave) return res.status(200).send({
                code:200,
                response:"order created successfully",
                orders:ordersave
            })
        })
    }
    else{
        return res.status(401).send({
            code:401,
            response:"Please fill all fields"
        })
    }
   }
   ,
   
   getOrder(req,res){
    var id_order = req.params.id;
    Order.findById(id_order,(err,order)=>{
        if(err) return res.status(500).send({
            code:500,
            response:"Error internal server"
        })

        if(!order) return res.status(404).send({
            code:404,
            response:"Error order not found"
        })

        if(order) return res.status(200).send({
            code:200,
            response:"Order finded succesfully",
            orders:order
        })
    })
   },
   getOrders(req,res){
    var page= 1
    var itemPerPage = 10
    if(req.params.page)
    {
        page= req.params.page
    }
    Order.find({}).paginate(page,itemPerPage,(err,response)=>{
        if(err) return res.status(500).send({
            code:500,
            response:"Error internal server"
        })

        if(!response) return res.status(404).send({
            code:404,
            response:"Error orders not  founds"
        })

        if(response) return res.status(200).send({
            code:200,
            response:"Orders findeds succesfully",
            orders:response
        })
    })
   },

   updateOrder(req,res){
    var id_order = req.params.id;
    var updated = req.body
    if(updated)
    {
        Order.findByIdAndUpdate(id_order,updated,{new:true},(err,response)=>{
            if(err) return res.status(500).send({
                code:500,
                response:"Error internal server"
            })

            if(!response) return res.status(404).send({
                code:404,
                response:"Error order not found"
            })

            if(response) return res.status(200).send({
                code:200,
                response:"Order updated succesfully",
                orders:response
            })
    })
    }
    else{
        return res.status(401).send({
            code:401,
            response:"Please fill all fields"
        })
    }

   },
   deletedOrder(req,res){
    var id_order = req.params.id
    Order.findByIdAndDelete(id_order,(err,response)=>{
        if(err) return res.status(500).send({
            code:500,
            response:"Error internal server"
        })

        if(!response) return res.status(404).send({
            code:404,
            response:"Error order not found"
        })

        if(response) return res.status(200).send({
            code:200,
            response:"order deleted succesfully",
            response:response
        })
    })
   }

}

module.exports = orderController;