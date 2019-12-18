var mongoose  = require('mongoose');

var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/DRUGSONLINE',{useNewUrlParser:true,useUnifiedTopology:true})    
.then(()=>{
    console.log("Conexion a la base de datos exitosa");
    app.listen(port,()=>{
        console.log("Servidor corriendo en el puerto : "+port)
        
    });
    
})
.catch(err=>{console.log("no se pudo conectar por : "+err)
})
