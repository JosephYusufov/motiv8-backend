var express = require('express');
var cors = require('cors'); var fs = require('fs'); 
var path = require('path');
var currentDir = process.cwd();

app = express();

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.get('/list', (req, res) => {
    res.send("timone");
});

app.listen(9000, () => {
    console.log('motiv8 listening on port 9000')
})
