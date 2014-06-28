var Hapi = require('hapi');
var Good = require('good');
var Bell = require('bell');
var Cookie = require('hapi-auth-cookie');
var Andyet = require('./');

var server = new Hapi.Server(4000);
server.pack.register([Good, Bell, Cookie], function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('andyet', 'bell', {
        provider: Andyet(),
        password: 'bellbivdevoeispoison',
        clientId: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET',
        isSecure: false
    });

    server.auth.strategy('session', 'cookie', 'required', {
        password: 'wilsonphilipsheldon',
        cookie: 'sid',
        redirectTo: '/login',
        isSecure: false
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            auth: 'andyet',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed: ' + request.auth.error.message).code(403);
                }

                request.auth.session.set(request.auth.credentials);

                reply.redirect('/');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            var profile = request.auth.credentials.profile;

            reply('Hello, ' + profile.firstName + ' ' + profile.lastName);
        }
    });

    server.route({
        method: 'GET',
        path: '/profile',
        handler: function (request, reply) {

            reply(request.auth.credentials.profile);
        }
    });

    server.start(function () {

        server.log('info', 'Sample auth server running at: ' + server.info.uri);
    });
});
