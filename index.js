var http = require("http");
var url = require("url");


var server = http.createServer(async (req, res) => {

    var info = url.parse(req.url, true);

    var response = await fetch("https://fakestoreapi.com/products");
    var data = await response.json();

    console.log(info.pathname)

    if (req.method === "GET") {
        if (info.pathname === "/products") {
            res.write(JSON.stringify(data));
            res.end();
        }
        else if (info.pathname === "/products/asc") {
            data.sort((a, b) => {
                return a.price - b.price;
            })
            res.write(JSON.stringify(data));
            res.end();
        }
        else if (info.pathname === "/products/desc") {
            data.sort((a, b) => {
                return b.price - a.price;
            })
            res.write(JSON.stringify(data));
            res.end();
        }
        else {
            res.write("please enter the pathname");
            res.end();
        }
    }
    else {
        res.write("error in getting data");
        res.end();
    }

});


var port = 3003;

server.listen(port, () => {
    console.log("server started");
});