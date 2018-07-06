
var nano = require("nano")("http://localhost:5984");
var http = require("http");

var DBNAME= 'petshop'

var server = http.createServer(function (request, response) {
    // nano.db.create("mylibrary", function (err, body, header) {
    //     if (err) {
    //         response.writeHead(500, { "Content-Type": "text/plain" });
    //         response.end("Database creation failed. " + err + "\n");
    //     } else {
    //         response.writeHead(200, { "Content-Type": "text/plain" });
    //         response.end("Database created. Response: " + JSON.stringify(body) + "\n");
    //     }
    // });
	var productData = [
		{
			name: 'Dog food',
			description: 'Great food to keep your dog healthy!',
			price: 55.00
		},
		{
			name: 'Cat bed',
			description: 'The most confortable bed for your cat!',
			price: 35.00
		},
		{
			name: 'Toy ball',
			description: 'A small toy ball to make your pet very happy!',
			price: 55.00
		},

	];

    // var book = {
    //     Title: "A Brief History of Time",
    //     Author: "Stephen Hawking",
    //     Type: "Paperback – Unabridged, September 1, 1998",
    //     ISBN: "978-0553380163"
    // };


    nano.use(DBNAME).insert(productData[0], function(err, body, header) {
        if(err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Inserting book failed. " + err + "\n");
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Book inserted. Response: " + JSON.stringify(body) + "\n");
        }
    });








});

server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");