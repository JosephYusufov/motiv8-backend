var express = require('express');
var cors = require('cors');
var fs = require('fs'); 
var path = require('path');
var pathToFiles = './public';
// var options = {
//     followLinks: false
// }
// var walker = walk.walk(pathToFiles, options);

const walk = (dir) => {
    // get the contents of dir
    fs.readdir(root, (e, items) => {
        // for each item in the contents
        items.forEach((item) => {
            // get the item path
            let itemPath = path.join(dir, item);
            // get the stats of the item
            fs.stat(itemPath, (e, stats) => {
                // Just log the item path for now
                console.log(itemPath);
                // for now just use stats to find out
                // if the current item is a dir
                if (stats.isDirectory()) {
                    // if so walk that too, by calling this
                    // method recursively
                    walk(itemPath);
                } else {
                    fs.readFile(itemPath, (e, buff) => {
                        buff.json().then((jsonData) => {
                            console.log(jsonData);
                        })
                    });
                }
            });
        });
    });
};
var app = express();

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.get('/list', (req, res) => {
    walk();
    res.send("timone");
});

app.listen(9000, () => {
    console.log('motiv8 listening on port 9000')
})
