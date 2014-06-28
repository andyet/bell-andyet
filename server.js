var Hapi = require('hapi');
var Bell = require('bell');
var Andyet = require('./');

var server = new Hapi.Server(4000);
server.pack.register(Bell, function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('andyet', 'bell', {
        provider: Andyet,
        password: 'bellbivdevoeispoison',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        isSecure: false
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: 'andyet',
            handler: function (request, reply) {

                reply(request.auth.credentials);
            }
        }
    });

    server.start();
});
