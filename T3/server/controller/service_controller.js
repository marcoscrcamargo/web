var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var service = require('../model/service');

router.post('/', function (req, res) {
    service.create({
            title : req.body.title,
            description: req.body.description,
            price: req.body.price,
            img_file: req.body.img_file
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    service.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    service.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.get('/:service_id', function (req, res) {
    user.one(req.params.service_id, function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:service_id', function(req, res, done) {
    console.log("deleting..." + req.params.service_id);
    service.erase(req.params.service_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.service_id);
    });
});


module.exports = router;