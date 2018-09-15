const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events')
const { Transform } = require('stream');

class MyWebpack extends EventEmitter{
  constructor(folder) {
      super();
      this.countFiles = 0;
      this.writeStr = null;
      this.folder = folder;
      this.init();
      this.arrayForOne = [];
      this.on('folderCreated', () => {
          this.readDirForMin(this.folder);
      })
      this.on('minified', (path, name) => {
          this.copyFile(path, name);
      })
      this.on('delete', (path) => {
        this.deleteFile(path);
      })
      this.on('zip',() => {
          console.log('doneAZAZAZAZAZA');
      })
  }
 copyFile(path1,name) {
     name = name.split('/');
    const read = fs.createReadStream(path1,{ encoding: 'utf-8'});
    const write = fs.createWriteStream(path.join(__dirname, 'min', name[name.length - 1]));
    read.pipe(write, {end: false});
    read.on('end',() => {
        console.log('File copied');
        this.emit('delete',path1);
    })
  }
  deleteFile(file) {
    fs.unlink(file, (err) => {
        if(err) {
            return err;
        }
    });
  }
  // Проверяем есть ли папка min
 checkMinFolder (path) {
    let check;
     return new Promise ((res,rej) => {
        fs.readdir(path,(err, files) => {
            if(err) {
                rej(err);
            }
            for ( let item of files) {
                if(item !== 'min'){
                check = false;
                } else {       
                check = true;
                break;
                }
            }
            res(check);   
          })
        
     }) 
  }
  // если нету тогда создаем 
  init() {
  this.checkMinFolder(__dirname)
    .then((check) => {
        if(!check) {
        fs.mkdir(path.join(__dirname,'min'),(err) =>{
                if(err) {
                    return err;
                }
               this.emit('folderCreated'); 
            })
        } else {
            this.emit('folderCreated');
        }
        return;
    })
  }
  // проходимся по всем директориям где нам нужно
  readDirForMin(nameDir) {
    fs.readdir(path.join(__dirname, nameDir), (err, files) => {
          if(err) {
              console.log(err);
              return;
          }
          for (let item of files) {
              const info = fs.stat(path.join(__dirname, nameDir, item), (err, stats) => {
                  if(err) {
                      return err;
                  }
                  if(stats.isDirectory()){
                    this.readDirForMin(path.join(nameDir,item));
                  } else {
                    this.countFiles += 1;
                    this.minify(path.join(nameDir,item));
                  }
              }) 
            }
      })
  }
  // минификатор для файлов
  minify(filename, folder = "") {
    const read = fs.createReadStream(path.join(__dirname, folder, filename),{ encoding: 'utf-8'})
    const transform = new Transform({ 
        transform(chunk,encoding,callback) {
            this.push(chunk.toString().replace(/\s/g, ''));
            callback();
        } 
    })
    const type = filename.substring(filename.lastIndexOf('.') + 1, filename.length)
    const write = fs.createWriteStream(path.join(__dirname, folder, `${filename.substring(0,filename.length - 2)}min.${type}`), {encoding: "utf-8"});
    read.pipe(transform).pipe(write, {end: false});
    transform.on('end', () => {
        console.log('One File minified');
        this.emit('minified',path.join(__dirname, folder, `${filename.substring(0,filename.length - 2)}min.${type}`), `${filename.substring(0,filename.length - 2)}min.${type}`);
        transform.end();
    })
  }
  toOneFile(fileDir,type) {
      fs.readdir(path.join(__dirname, fileDir), (err, files) => {
        this.arrayForOne = files.filter((item) => item.indexOf(type) > 0);
        console.log(this.arrayForOne);
    if(this.arrayForOne.length) {    
        this.createWrite(fileDir, type);
        this.createOneFile(fileDir, this.arrayForOne, 'type');
    }
      })
  }
  createWrite(fileDir,type) {
    const write = fs.createWriteStream(path.join(__dirname, fileDir, `min${type}`), {encoding: "utf-8"});
    return this.writeStr = write;
  }
  createOneFile(fileDir, fileNamesArray, type, num = 0) { 
    const read = fs.createReadStream(path.join(__dirname, fileDir, fileNamesArray[num]),{ encoding: 'utf-8'});
    read.pipe(this.writeStr, {end: false});
    read.on('end', () => {
        num += 1;
        this.writeStr.write('\n');
        if (num < fileNamesArray.length) {
            this.createOneFile(fileDir, fileNamesArray, type, num);
        } else {
            if(type == '.html') {
                this.writeStr.write('Jocasino.com');
            }
            this.writeStr.end();
            this.emit('zip');
        }
    })
    
    
    }
}
const webpack = new MyWebpack('test');
setTimeout(() =>{webpack.toOneFile('min', '.js');},3000);

