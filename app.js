// Módulos.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb')
var gestorBD = require('./modules/gestorBD.js')
gestorBD.init(app, mongo);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Variables de entorno.
app.set('port', 8081);
app.set('db', 'mongodb://admin:ERUifkEQpPkdfjJW@mercacalle-shard-00-00-3lwrv.mongodb.net:27017,mercacalle-shard-00-01-3lwrv.mongodb.net:27017,mercacalle-shard-00-02-3lwrv.mongodb.net:27017/api?ssl=true&replicaSet=mercacalle-shard-0&authSource=admin&retryWrites=true&w=majority')

// Rutas/controladores por lógica.
require('./routes/rusuarios.js')(app, gestorBD);
require('./routes/rmensajes.js')(app, gestorBD);

app.listen(app.get('port'), function() {
    console.log('Servidor activo');
});