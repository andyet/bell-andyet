module.exports = {
    protocol: 'oauth2',
    auth: 'https://apps.andyet.com/oauth/authorize',
    token: 'https://apps.andyet.com/oauth/access_token',
    scope: [],
    profile: function (credentials, params, get, callback) {

        get('https://api.andbang.com/me', {}, function (response) {

            credentials.profile = response;
            callback();
        });
    }
};
