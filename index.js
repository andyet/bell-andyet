module.exports = function (options) {

    options = options || {};
    var apps = options.apps || 'https://apps.andyet.com';
    var api = options.api || 'https://api.andbang.com';

    return {
        protocol: 'oauth2',
        auth: apps + '/oauth/authorize',
        token: apps + '/oauth/access_token',
        profile: function (credentials, params, get, callback) {

            get(api + '/me', null, function (response) {

                credentials.profile = response;
                callback();
            });
        }
    };
};
