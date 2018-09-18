const { join } = require('path');
const { Transform } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const fileName = 'style.css';
const minFileName = 'style.min.css';
const zipFileName = 'style.zip';
const minFolder = 'app';

const readStream = createReadStream(join(__dirname, fileName));
readStream.setEncoding('utf8');
const writeMinifiedStream = createWriteStream(join(__dirname, minFolder, minFileName));
const writeZippedStream = createWriteStream(join(__dirname, minFolder, zipFileName));

const transform = new Transform({ 
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().replace(/\s/g, ''));
        callback();
    } 
})

readStream
	.on('end', () => {
		console.log(`The file ${ fileName } was minified`);
	})
	.pipe(transform)
	.pipe(writeMinifiedStream, { end: false })

readStream
	.on('end', () => {
		console.log(`The file ${ fileName } was zipped`);
	})
	.pipe(createGzip())
	.pipe(writeZippedStream)
