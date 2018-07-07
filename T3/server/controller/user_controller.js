var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var user = require('../model/user');

router.post('/', function (req, res) {
    user.create({
            name : req.body.name,
            phone : req.body.phone,
            // picture: req.body.picture,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin,
            adress: req.body.adress
        },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        });
});

router.put('/', function (req, res) {
    user.update(req.body,
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send("ok");
        }
    );
});

router.get('/', function (req, res) {
    user.all(function(err, result){
        if(err){
            console.log("error");
            return;
        }
        res.status(200).send(result);
    })
});

router.delete('/:user_id', function(req, res, done) {
    console.log("deleting..." + req.params.user_id);
    user.erase(req.params.user_id,function(err){
        if(err)
            return res.status(500).send(err);
        res.status(200).send(req.params.user_id);
    });
});

module.exports = router;