module.exports = function(app, gestorBD) {

    app.get('/api/mensaje', function(req, res) {
        gestorBD.obtenerMensajes({}, function(mensajes) {

            if (mensajes == null) {
                res.status(500);
                res.json({
                    error : 'Se ha producido un error'
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(mensajes));
            }
        });
    });

    app.get('/api/mensaje/:id', function(req, res) {
        var criterio = {'_id' : gestorBD.mongo.ObjectID(req.params.id)}

        gestorBD.obtenerMensajes(criterio, function(mensajes) {

            if (mensajes == null) {
                res.status(500);
                res.json({
                    error : 'se ha producido un error'
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(mensajes[0]));
            }
        });
    });

    app.delete('/api/mensaje/:id', function(req, res) {
        var criterio = {'_id' : gestorBD.mongo.ObjectID(req.params.id)}

        gestorBD.eliminarMensaje(criterio, function(mensajes) {

            if (mensajes == null) {
                res.status(500);
                res.json({
                    error : ' se ha producido un error'
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(mensajes));
            }
        });
    });

    app.post('/api/mensaje', function(req, res) {
        var mensaje = {
            emisor : req.body.emisor,
            destino : req.body.destino,
            texto : req.body.texto,
            leido : req.body.leido,
        }
        // TODO: some validations

        gestorBD.insertarMensaje(mensaje, function(id) {

            if (id == null) {
                res.status(500);
                res.json({
                    error : 'se ha producido un error'
                })
            } else {
                res.status(201);
                res.json({
                    mensaje : 'mensaje insertado',
                    _id : id
                });
            }
        });
    });

    app.put('/api/mensaje/:id', function(req, res) {
        var criterio = {'_id' : gestorBD.mongo.ObjectID(req.params.id)};
        var mensaje = {};

        if (req.body.emisor != null) 
            mensaje.emisor = req.body.emisor;
        if (req.body.destino != null)
            mensaje.destino = req.body.destino;
        if (req.body.texto != null)
            mensaje.texto = req.body.texto;
        if (req.body.leido != null)
            mensaje.leido = req.body.leido;

        gestorBD.modificarMensaje(criterio, mensaje, function(result) {
            if (result == null) {
                res.status(500);
                res.json({
                    error : 'se ha producido un error'
                })
            } else {
                res.status(200);
                res.json({
                    mensaje : 'mensaje modificado',
                    _id : criterio['_id']
                })
            }
        });
    });

};