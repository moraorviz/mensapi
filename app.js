// Módulos.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb')
var gestorBD = require('./modules/gestorBD.js')
gestorBD.init(app, mongo);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Variables.
app.set('port', 8081);

// Rutas/controladores por lógica.
require('./routes/rusuarios.js')(app, gestorBD);
require('./routes/rmensajes.js')(app, gestorBD);

app.listen(app.get('port'), function() {
    console.log('Servidor activo');
});