const path = require('path');
const { readFile } = require('fs');

readFile(path.join(__dirname, 'helloWorld.js'), (err, fileData) => {
    console.log(fileData.toString());
});



console.log('This is the end')