var vhost = require('vhost');
var express = require('express');

express()
.use(vhost('api.18.220.185.98', require('./api/index.js').app))
// .use(vhost('localhost:9000', require('/path/to/sync').app))
.listen(80)
