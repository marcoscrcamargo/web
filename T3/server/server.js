const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const express = require('express');
const server = express();


server.use( bodyParser.urlencoded({extended: true}) );
server.use( bodyParser.json() );

const User = require('./controller/user_controller');
const Cart = require('./controller/cart_controller');
const Sale = require('./controller/sale_controller');
const Schedule = require('./controller/schedule_controller');
const Pet = require('./controller/pet_controller');
const Product = require('./controller/product_controller');
const Service = require('./controller/service_controller');


server.use(function (req, res, next) {
    // Website you wish to allow to connect
    // Não estava funcionando com '*'.
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});


server.use('/user', User);
server.use('/cart', Cart);
server.use('/sale', Sale);
server.use('/schedule', Schedule);
server.use('/pet', Pet);
server.use('/product', Product);
server.use('/service', Service);


server.listen(port, () => console.log(`Listening on port ${port}`))