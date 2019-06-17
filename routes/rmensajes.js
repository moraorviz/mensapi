module.exports = function(app) {

    app.post('/api/mensaje', function(req, res) {

        var mensaje = {
            emisor  : req.body.emisor,
            destino : req.body.destino,
            texto : req.body.texto,
            leido : req.body.leido
        }

        

    })

};