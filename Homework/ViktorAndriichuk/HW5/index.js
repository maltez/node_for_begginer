const http = require("http");
const fs = require("fs");
 
http.createServer( (req, res) => {

    if ( req.method === 'POST' && req.url.startsWith("/") ) {

		const filePath = req.url.substr(1);

        fs.readFile( filePath, "utf8", (error, data) => {
            if (error) {
				res.writeHead(404, {"Content-Type" : "application/json"});
				res.end("Not found!");
            } else {
				res.writeHead(200, {"Content-Type" : "application/json"});
				res.end(data);
			}
            return;
		})
		
    }
	else res.end("Hello World!");
	
}).listen(3000);

module.exports = http;