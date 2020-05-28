// entry point
var vhost = require('vhost');
var express = require('express');
var https = require('https');
var fs = require('fs');

// .use(vhost('api.readbitwise.com', require('./api/index.js').app))
// .listen(80)
const app = express();
app.use(vhost('api.readbitwise.com', require('./api/index.js').app));

https.createServer({
     key: fs.readFileSync('/etc/letsencrypt/live/api.readbitwise.com/privkey.pem'),
     cert: fs.readFileSync('/etc/letsencrypt/live/api.readbitwise.com/fullchain.pem')
}, app)
.listen(443, () => {
    console.log('motiv8 listening on port 443')
})

