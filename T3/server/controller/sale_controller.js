var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var sale = require('../model/sale');

router.post('/', function (req, res) {
    sale.create({
            product:req.body.product,
            username:req.body.username,
            quantity:req.body.quantity,
            price:req.body.price,
            date:req.body.date,

        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    sale.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    sale.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.get('/:sale_id', function (req, res) {
    user.one(req.params.sale_id, function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:sale_id', function(req, res, done) {
    console.log("deleting..." + req.params.sale_id);
    sale.erase(req.params.sale_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.sale_id);
    });
});

module.exports = router;