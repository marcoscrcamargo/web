var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var pet = require('../model/pet');

router.post('/', function (req, res) {
    pet.create({
            name : req.body.name,
            animal: req.body.animal,
            breed : req.body.breed,
            age : req.body.age,
            picture: req.body.picture,
            username: req.body.username
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    pet.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    pet.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.get('/:pet_id', function (req, res) {
    user.one(req.params.pet_id, function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:pet_id', function(req, res, done) {
    console.log("deleting..." + req.params.pet_id);
    pet.erase(req.params.pet_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.pet_id);
    });
});

module.exports = router;