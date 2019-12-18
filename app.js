var express = require('express');
var bodyparser = require('body-parser');
var app = express()


//CARGAR ARCHIVOS DE RUTAS
var routes = require('./routes/userRoutes');

//MIDLEWARES
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API_KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
})




//RUTAS DEFINIDAS
app.use('/API',routes);




module.exports = app;