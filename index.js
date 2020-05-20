const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const app = express();

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(9000, () => {
    fs.stat('./public/', (err, stats) => {
        console.log(stats);
    })
    console.log('motiv8 listening on port 9000')
});
