var express = require('express');
var User = require('../../models/user.js');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.render('admin/profile', {user: req.user, active_profile: true, title:'博客信息'});
    })
    .post(function (req, res) {
        req.user.title = req.body.title;
        req.user.description = req.body.description;

        req.user.save(function (err, user) {
            if (err) next(err);
            res.render('admin/profile', {user: user, active_profile: true});
        });
    });

module.exports = router;
