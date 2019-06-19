module.exports = function(app, gestorBD) {

    app.get('/api/usuario', function(req, res) {
        gestorBD.obtenerUsuarios({}, function(req, res) {

            if (usuarios == null) {
                res.status(500);
                res.json({
                    error : 'Se ha producido un error'
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(usuarios));
            }
        })
    });

    app.post('/api/usuario', function(req, res) {
        var seguro = app.get('crypto').createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        var usuario = {
            email : req.body.email,
            password : seguro
        }

        gestorBD.insertarUsuario(usuario, function(id) {

            if (id == null) {
                res.status(500);
                res.json({
                    error : 'se ha producido un error'
                })
            } else {
                res.status(201);
                res.json({
                    mensaje : 'usuario insertado',
                    _id : id
                });
            }
        });
    });

    app.post('/api/autenticar', function(req, res) {
        var seguro = app.get('crypto').createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        var criterio = {
            email : req.body.email,
            password : seguro
        }
        console.log(criterio);

        gestorBD.obtenerUsuarios(criterio, function(usuarios) {

            if (usuarios == null || usuarios.length == 0) {
                res.status(500);
                res.json({
                    autenticado : false
                })
            } else {
                var token = app.get('jwt').sign({
                    usuario : criterio.email,
                    tiempo : Date.now()/1000
                }, 'secreto');
                res.status(200);
                res.json({
                    autenticado : true,
                    token : token
                })
            }
        });
    });

};
