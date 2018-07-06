var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var product = require('../model/product');


router.post('/', function (req, res) {
    // console.log(req);
    product.create({
            name : req.body.name,
            description: req.body.description,
            price: req.body.price,
            // foto: req.body.foto,
            // searchtags: req.body.searchtags,
            // quantidadeEstoque: req.body.quantidadeEstoque
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});


router.put('/', function (req, res) {
    product.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});


// return all clients
router.get('/', function (req, res) {
    product.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});


// Delete produto
router.delete('/:product_id', function(req, res, done) {
    console.log("deleting..." + req.params.product_id);
    product.erase(req.params.product_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.product_id);
    });
});



module.exports = router;