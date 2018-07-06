const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const express = require('express');
const server = express();


server.use( bodyParser.urlencoded({extended: true}) );
server.use( bodyParser.json() );

// server.listen(port, () => console.log('listening on port:' + port))



// const Cliente = require('./controller/Cliente_controller');
// const Administrador = require('./controller/Administrador_controller');
// const Animal = require('./controller/Animal_controller');
const Product = require('./controller/product_controller');
// const Servico = require('./controller/Servico_controller');





// server.use('/cliente', Cliente);
// server.use('/admin', Administrador);
// server.use('/animal', Animal);
server.use('/product', Product);
// server.use('/servico', Servico);


server.listen(port, () => console.log(`Listening on port ${port}`))