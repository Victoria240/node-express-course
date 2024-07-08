const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to the homepage!");
        res.end();
    } else if (req.url === "/about") {
        res.write("Here is our short history");
        res.end();
    } else {
        res.write("Oops! Page not found");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
