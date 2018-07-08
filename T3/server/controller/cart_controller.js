var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var cart = require('../model/cart');

router.post('/', function (req, res) {
    cart.create({
            username:req.body.username,
            productId:req.body.productId,
            name:req.body.name,
            img_file:req.body.img_file,
            description:req.body.description,
            price:req.body.price,
            quantity:req.body.quantity
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    cart.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    cart.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:cart_id', function(req, res, done) {
    console.log("deleting..." + req.params.cart_id);
    cart.erase(req.params.cart_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.cart_id);
    });
});

module.exports = router;