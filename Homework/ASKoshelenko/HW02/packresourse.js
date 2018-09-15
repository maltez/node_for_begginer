const { createReadStream, createWriteStream } = require('fs');
const { createGzip } = require('zlib');

const path = () => {
  return  __filename.slice(__filename.indexOf('\\'), __filename.lastIndexOf('\\')).split('\\').join('/');
};

const zipMinFiles = (files) => {  
  files.forEach((file) => {    
    const currentStream = createReadStream(file);
    const modifyStream = createWriteStream(file + '.zip');
    currentStream.pipe(createGzip()).pipe(modifyStream);
  }); 
}

const htmlModify = (files) => {  
  files.forEach((file) => {
    const currentStream = createReadStream(file);
    const modifyStream = createWriteStream(file.slice(0, file.indexOf('.')) + '.min' + file.slice(file.indexOf('.'), file.length));
    
    currentStream.on('data', (chunk) => {
      modifyStream.write(chunk.toString().split(' ').filter((el) => el !== '').join(' ').split('\n').map((el) => el.trim()).join(''));      
    });    
    currentStream.on('end', (chunk) => {
      modifyStream.write(`<span>copyright JoyCasino</span>`);
    });   
  });
}

const bundle = (files) => {
  const modifyStream = createWriteStream(files[0].slice(files[0].lastIndexOf('.') + 1, files[0].length) === 'js' ? 'script' +  files[0].slice(files[0].indexOf('.'), files[0].length) : 'style' +  files[0].slice(files[0].lastIndexOf('.'), files[0].length));
  files.forEach((file) => {
    const currentStream = createReadStream(file);
    currentStream.pipe(modifyStream);
  }); 
}

const bundleMinify = (files) => {
  const modifyStream = createWriteStream(files[0].slice(files[0].lastIndexOf('.') + 1, files[0].length) === 'js' ? 'script.min' +  files[0].slice(files[0].indexOf('.'), files[0].length) : 'style.min' +  files[0].slice(files[0].lastIndexOf('.'), files[0].length));
  files.forEach((file) => {
    const currentStream = createReadStream(file);
    currentStream.on('data', (chunk) => {
      modifyStream.write(chunk.toString().split(' ').filter((el) => el !== '').join(' ').split('\n').map((el) => el.trim()).join(''));      
    });
  }); 
}

const minify = (files) => {
  if(Array.isArray(files)) {
    files.forEach((file) => {
      const currentStream = createReadStream(file);
      const modifyStream = createWriteStream(file.slice(0, file.indexOf('.')) + '.min' + file.slice(file.indexOf('.'), file.length));

      currentStream.on('data', (chunk) => {
        modifyStream.write(chunk.toString().split(' ').filter((el) => el !== '').join(' ').split('\n').map((el) => el.trim()).join(''));
      });
    })
  }
  else {
    const currentStream = createReadStream(files);
    const modifyStream = createWriteStream(files.slice(files.lastIndexOf('.') + 1, files.length) === 'html' ? files : files.slice(0, files.indexOf('.')) + '.min' + files.slice(files.indexOf('.'), files.length));

    currentStream.on('data', (chunk) => {
      modifyStream.write(chunk.toString().split(' ').filter((el) => el !== '').join(' ').split('\n').map((el) => el.trim()).join(''));
    });
  }
    
}

module.exports = { htmlModify, bundle, bundleMinify, minify, zipMinFiles, path };