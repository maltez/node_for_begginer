const fs = require('fs');
const { path , zipMinFiles } = require('./packresourse');

class ZipMin {
  constructor(path) {
    this.path = path;
  }

  execute() {
    fs.readdir(this.path, function(err, els) {
      zipMinFiles(els.filter(el => el.slice(el.indexOf('.') + 1, el.indexOf('.') + 4) === 'min'));
    });
  }
}

const zip = new ZipMin(path());
zip.execute();