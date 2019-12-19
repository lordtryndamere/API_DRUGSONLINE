'use strict'

var express = require('express');
var validador = require('../middlewares/auth');
var usercontroller = require('../controllers/userController');
var PharmacieController  = require('../controllers/pharmacieController');
var orderController = require('../controllers/orderController');
var route  = express.Router();
//MIDLEWARES


//RUTAS

//USERS
route.post('/register',usercontroller.registerUser);
route.post('/login',usercontroller.AuthLogin);
route.get('/getuser/:id',usercontroller.getUser);
route.get('/getusers/:page?',usercontroller.getUsers);
route.delete('/delete/:id',usercontroller.deleteUser);
route.post('/updated/:id',usercontroller.updateUser);
//PHARMACIES
route.post('/registerpharmacie',PharmacieController.createPharmacie);
route.post('/loginpharmacie',PharmacieController.authpharmacie);
route.get('/getpharmacie/:id',PharmacieController.getPharmacie);
route.get('/getpharmacies/:page?',PharmacieController.getPharmacies);
route.delete('/deletepharmacie/:id',PharmacieController.deletePharmacie);
route.put('/updatedpharmacie/:id',PharmacieController.updatePharmacie);

//ORDERS
route.post('/createorder',orderController.createOrder);
route.get('/getorder/:id',orderController.getOrder);
route.get('/getorders/:page?',orderController.getOrders);
route.delete('/deleteorder/:id',orderController.deletedOrder);
route.put('/updatedorder/:id',orderController.updateOrder);











module.exports = route;
