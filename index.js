var vhost = require('vhost');
var express = require('express');

express()
.use(vhost('api.localhost:9000', require('./api/index.js').app))
// .use(vhost('localhost:9000', require('/path/to/sync').app))
.listen(9000)