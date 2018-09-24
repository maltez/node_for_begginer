const { createReadStream } = require('fs');
const miniexpress = require('http');

miniexpress.jsonIn = (obj) => JSON.stringify(obj);

miniexpress.jsonOut = (obj) => JSON.parse(obj);

miniexpress.modifyData = (obj, str) => {
    for(let key in obj) {
       str = str.slice(0, str.indexOf(`{{${key}}}`)) + obj[key] + str.slice(str.indexOf(`{{${key}}}`) + key.length + 4, str.length);
    }
    return str;
}
  
miniexpress.getRoute = (str, func) => {
    if(req.url === str) {
        func();
    }  else {
        res.writeHead(404, {
        "content-type": "application/json"
        });
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Error</title>
        </head>
        <body>
            <pre>Can't find ${str}</pre>
        </body>
        </html>`);
    }
}

miniexpress.putBody = (file, str, func) => {
    if(( req.method === 'POST' ) && (req.url === str)) {
        func();
        const model = jsonOut(req.body);
        const read = createReadStream(file);
        read.on('data', (data) => {
        res.write(modifyData(model, data));
        });   
    }
    else {
        res.writeHead(404, {
        "content-type": "application/json"
        });
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Error</title>
        </head>
        <body>
            <pre>Can't find ${str}</pre>
        </body>
        </html>`);
    }
}

module.exports = miniexpress;