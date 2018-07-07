var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var sale = require('../model/sale');

router.post('/', function (req, res) {
    sale.create({
            name:req.body.name,
            username:req.body.username,
            price:req.body.price,
            quantity:req.body.quantity,
            id:req.body.id
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

router.delete('/:sale_id', function(req, res, done) {
    console.log("deleting..." + req.params.sale_id);
    sale.erase(req.params.sale_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.sale_id);
    });
});

module.exports = router;