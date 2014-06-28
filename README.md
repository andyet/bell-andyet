## bell-andyet

This is an authentication plugin for [bell](https://github.com/spumko/bell) to allow using andyet's for your hapi apps.

### Usage

This module exports a function that accepts an options parameter and returns a provider object. The default options are:

```javascript
{
  apps: 'https://apps.andyet.com',
  api: 'https://api.andbang.com'
}
```

See server.js for an example of the full usage of this module, including incorporating it with [hapi-auth-cookie](https://github.com/spumko/hapi-auth-cookie) for sessions.
