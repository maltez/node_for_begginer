const fs = require('fs');
const {bundleMinify, htmlModify, path} = require('./packresourse');

class PreparePack {
    constructor(path) {
      this.path = path;
    }
    execute() {
      fs.readdir(this.path, function(err, els) {
        bundleMinify(els.filter(el => el.slice(el.lastIndexOf('.') + 1, el.length + 1) === 'js'));
        bundleMinify(els.filter(el => el.slice(el.lastIndexOf('.') + 1, el.length + 1) === 'css'));
        htmlModify(els.filter(el => el.slice(el.lastIndexOf('.') + 1, el.length + 1) === 'html'));
      });
    }
}


const web = new PreparePack(path());
web.execute();