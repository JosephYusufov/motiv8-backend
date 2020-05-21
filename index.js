var express = require('express');
var cors = require('cors'); var fs = require('fs'); 
var path = require('path');
var fs = require('fs');
var currentDir = process.cwd();

app = express();

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
	if (fs.statSync(dirPath + "/" + file).isDirectory()){
	    arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);    
	} else {
	    arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));  
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

app.use(cors())
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.get('/list', (req, res) => {
    const fileNames = filterAndProcess(getAllFiles("public")); 
    console.log(fileNames);
    res.send(fileNames);
});

app.listen(9000, () => {
    console.log('motiv8 listening on port 9000')
})
