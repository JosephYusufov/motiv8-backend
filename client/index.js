var express = require('express');
var cors = require('cors'); 
var fs = require('fs'); 
var path = require('path');
var fs = require('fs');

const app = express();
app.use(cors({credentials: true, origin: true}))
app.use(express.static(path.join(__dirname, '/build')));


app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
});


exports.app = app

// app.listen(80, () => {
// 	console.log("listenint");
// })
