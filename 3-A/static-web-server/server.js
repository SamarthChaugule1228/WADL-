// Importing required modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Port number
const PORT = 1800;

// MIME Types
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt'
};

// Creating server
http.createServer((req, res) => {

  // Parse URL
  const parsedUrl = url.parse(req.url);

  // If URL is root "/"
  if (parsedUrl.pathname === "/") {

    let filesLink = "<ul>";
    res.setHeader('Content-type', 'text/html');

    // Read current directory
    const filesList = fs.readdirSync("./");

    filesList.forEach(file => {
      if (fs.statSync("./" + file).isFile()) {
        filesLink += `<li><a href="./${file}">${file}</a></li>`;
      }
    });

    filesLink += "</ul>";

    res.end("<h1>List of Files:</h1>" + filesLink);
  }

  else {

    // Prevent directory traversal
    const sanitizePath =
      path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

    const pathname = path.join(__dirname, sanitizePath);

    // Check file exists or not
    if (!fs.existsSync(pathname)) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
    }

    else {

      // Read file
      fs.readFile(pathname, function (err, data) {

        if (err) {
          res.statusCode = 500;
          res.end("Error reading file.");
        }

        else {

          const ext = path.parse(pathname).ext;

          res.setHeader('Content-type',
            mimeType[ext] || 'text/plain');

          res.end(data);
        }

      });
    }
  }

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});