var express = require('express');
var cors = require('cors'); 
var fs = require('fs'); 
var path = require('path');
var fs = require('fs');

// var https = require('https');
var currentDir = process.cwd();

app = express();
app.use(express.static(process.cwd() + '/api/public', { dotfiles: 'allow' }));
app.use(cors({credentials: true, origin: true}));

const getAllFiles = (dirPath, arrayOfFiles) => {
	console.log(process.cwd());
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

app.get('/list', (req, res) => {
    const fileNames = filterAndProcess(getAllFiles("./api/public")); 
    console.log(fileNames);
    res.send(fileNames);
});

app.get('/article/:articleId', (req, res) => {
    res.sendFile(path.join(process.cwd() + '/api' + '/public/' + req.params.articleId + '/index.md'));
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
