// entry point
var vhost = require('vhost');
var express = require('express');
var https = require('https');
var fs = require('fs');
var cors = require('cors');

const app = express();
app.use(vhost('api.readbitwise.com', require('./api/index.js').app));
app.use(vhost('readbitwise.com', require('./client/index.js').app));
app.use(cors({credentials: true, origin: true}));

https.createServer({
     key: fs.readFileSync('/etc/letsencrypt/live/api.readbitwise.com/privkey.pem'),
     cert: fs.readFileSync('/etc/letsencrypt/live/api.readbitwise.com/fullchain.pem')
}, app)
.listen(443, () => {
    console.log('motiv8 listening on port 80')
})

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

