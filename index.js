const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(9000, () => console.log('motiv8 listening on port 9000'));
