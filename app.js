// Módulos.
var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb')
var crypto = require('crypto');
var gestorBD = require('./modules/gestorBD.js')
gestorBD.init(app, mongo);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Variables de entorno.
app.set('port', 8081);
app.set('db', 'mongodb://admin:ERUifkEQpPkdfjJW@mercacalle-shard-00-00-3lwrv.mongodb.net:27017,mercacalle-shard-00-01-3lwrv.mongodb.net:27017,mercacalle-shard-00-02-3lwrv.mongodb.net:27017/api?ssl=true&replicaSet=mercacalle-shard-0&authSource=admin&retryWrites=true&w=majority')
//app.set('db', 'mongodb://localhost:27017')
app.set('crypto', crypto);
app.set('jwt', jwt);

// routerUsuarioToken
var routerUsuarioToken = express.Router();
routerUsuarioToken.use(function (req, res, next) {
    // obtener el token, puede ser un parámetro GET , POST o
    HEADER
    var token = req.body.token || req.query.token || req.headers['token'];
    if (token != null) {
        // verificar el token
        jwt.verify(token, 'secreto', function (err, infoToken) {
            if (err || (Date.now() / 1000 - infoToken.tiempo) > 240) {
                res.status(403)
                res.json({
                    acceso: false,
                    error: 'Token invalido o caducado'
                });
                // También podríamos comprobar que intoToken.usuario existe
                return;
            } else {
                // dejamos correr la petición
                res.usuario = infoToken.usuario;
                next();
            }
        });
    } else {
        res.status(403)
        res.json({
            acceso: false,
            mensaje: 'No hay Token'
        });
    }
});
// Aplicar routerUsuarioToken
app.use('/api/mensaje', routerUsuarioToken);

// Rutas/controladores por lógica.
require('./routes/rusuarios.js')(app, gestorBD);
require('./routes/rmensajes.js')(app, gestorBD);

app.listen(app.get('port'), function () {
    console.log('Servidor activo');
});