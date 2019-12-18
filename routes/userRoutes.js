'use strict'

var express = require('express')
var validador = require('../middlewares/auth')
var usercontroller = require('../controllers/userController');
var PharmacieController  = require('../controllers/pharmacieController');
var route  = express.Router();
//MIDLEWARES


//RUTAS
route.post('/register',usercontroller.registerUser);
route.post('/login',usercontroller.AuthLogin);
route.post('/pharmacie',PharmacieController.createPharmacie);













module.exports = route;
