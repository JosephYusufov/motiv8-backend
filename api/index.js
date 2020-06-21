var express = require('express');
var cors = require('cors'); 
var fs = require('fs'); 
var path = require('path');
var fs = require('fs');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');


app = express();
app.use(express.static(process.cwd() + '/api/public', { dotfiles: 'allow' }));
app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
	if (fs.statSync(dirPath + "/" + file).isDirectory()){
	    arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);    
	} else {
	    arrayOfFiles.push(path.join(process.cwd(), dirPath, "/", file));  
	};
    });

    arrayOfFiles.filter((filePath) => {
	return filePath.slice(-5) === "json";
    });

    return arrayOfFiles;
};

const filterAndProcess = (filePathsArray) => {
    return filePathsArray.filter((filePath) => {
	return filePath.slice(-4) === "json";
    }).map((filePath) => {
	let buff = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(buff);
    });
};


app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.post('/mailing-list/add', (req, res) => {
    const auth = "Basic " + Buffer.from('admin' + ":" + "3d630f66fc261a89b8bfbc1e9b3d93fe-us10").toString('base64');
    console.log(req.body);
    fetch('https://us10.api.mailchimp.com/3.0/lists/0a9c037483/members/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: JSON.stringify(req.body)
    }).catch(err => {
        res.send(err);
    }).then(mailChimpRes => {
        res.status(mailChimpRes.status);
        res.send();
    });
});

app.get('/list', (req, res) => {
    const fileNames = filterAndProcess(getAllFiles("./api/public")); 
    console.log(fileNames);
    res.send(fileNames);
});

app.get('/article/:articleId', (req, res) => {
    res.send(fs.readFileSync(path.join(process.cwd() + '/api' + '/public/' + req.params.articleId + '/index.md'), 'utf-8'));
});

app.get('/meta/:articleId', (req, res) => {
    res.send(fs.readFileSync(path.join(process.cwd() + '/api' + '/public/' + req.params.articleId + '/meta.json'), 'utf-8'));
});




// https.createServer({
// 	key: fs.readFileSync('/etc/letsencrypt/live/josephyusufov.me/privkey.pem'),
// 	cert: fs.readFileSync('/etc/letsencrypt/live/josephyusufov.me/fullchain.pem')
// }, app).listen(443, () => {
//     console.log('motiv8 listening on port 443')
// })

exports.app = app

// app.listen(80, () => {
// 	console.log("listenint");
// })
