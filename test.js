// entry point
var vhost = require('vhost');
var express = require('express');
var https = require('https');
var fs = require('fs');
var cors = require('cors');

const app = express();
app.use(vhost('api.localhost', require('./api/index.js').app));
app.use(vhost('localhost', require('./client/index.js').app));
app.use(cors({credentials: true, origin: true}));

app.listen(8000, () => {
    console.log("listening on 8000");
});

