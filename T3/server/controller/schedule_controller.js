var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var schedule = require('../model/schedule');

router.post('/', function (req, res) {
    schedule.create({
            name:req.body.name,
            username:req.body.username,
            pet:req.body.pet,
            id:req.body.id,
            description:req.body.description,
            date:req.body.date
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    schedule.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    schedule.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.get('/:schedule_id', function (req, res) {
    user.one(req.params.schedule_id, function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:schedule_id', function(req, res, done) {
    console.log("deleting..." + req.params.schedule_id);
    schedule.erase(req.params.schedule_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.schedule_id);
    });
});

module.exports = router;