const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const express = require('express');
const server = express();


server.use( bodyParser.urlencoded({extended: true}) );
server.use( bodyParser.json() );

// server.listen(port, () => console.log('listening on port:' + port))



// const Cliente = require('./controller/Cliente_controller');
const User = require('./controller/user_controller');
const Pet = require('./controller/pet_controller');
const Product = require('./controller/product_controller');
const Service = require('./controller/service_controller');





// server.use('/cliente', Cliente);
server.use('/user', User);
server.use('/pet', Pet);
server.use('/product', Product);
server.use('/service', Service);

server.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

server.listen(port, () => console.log(`Listening on port ${port}`))