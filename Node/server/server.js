const fs = require("fs");
const path = require("path");
const http = require("http");

const port = 8080;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url,
  );

  const extName = path.extname(filePath).toLocaleLowerCase();

  let mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/js",
  };

  const contentType = mimeType[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("No page found");
      }
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });
      res.end(data, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on the ${port}`);
});
