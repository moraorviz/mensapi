module.exports = {

    mongo: null,
    app: null,
    init: function (app, mongo) {
        this.mongo = mongo;
        this.app = app;
    },

    insertarMensaje: function (mensaje, funcionCallback) {

        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {

            if (err) {
                functionCallback(null);
            } else {
                var collection = db.collection('mensajes');
                collection.insert(mensaje, function (err, result) {

                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close()
                });
            }
        });
    },

    eliminarMensaje: function (criterio, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {

            if (err) {
                functionCallback(null);
            } else {
                var collection = db.collection('mensajes');
                collection.remove(criterio, function (err, result) {

                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close();
                });
            }
        });
    },

    modificarMensaje: function(criterio, mensaje, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {

            if (err) {
                functionCallback(null);
            } else {
                var collection = db.collection('mensajes');
                collection.update(criterio, {$set: mensaje}, function(err, result) {

                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close()
                });
            }
        });
    },

    insertarUsuario: function (usuario, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {

            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('usuarios');
                collection.insert(usuario, function (err, result) {

                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },

    obtenerUsuarios: function (criterio, funcionCallback) {
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {

            if (err) {
                funcionCallback(null);
            } else {
                var collection = db.collection('usuarios');
                collection.find(criterio).toArray(function (err, usuarios) {

                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios);
                    }
                    db.close()
                });
            }
        });
    },

};