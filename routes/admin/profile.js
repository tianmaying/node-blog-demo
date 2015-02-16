var express = require('express');
var User = require('../../models/user.js');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.route('/')
    .get(function (req, res) {
        res.render('admin/profile', {user: req.user, active_profile: true, title:'博客信息'});
    })
    .post(function (req, res) {
        req.user.title = req.body.title;
        req.user.description = req.body.description;

        if(req.files.avatar){
            if(req.files.avatar.originalFilename){
                req.user.avatar = '/uploads/' + path.basename(req.files.avatar.path);
            }
            else{
                fs.unlink(req.files.avatar.path, function(err){
                    console.error('tmp file unlink failed:', err);
                });
            }
        }

        req.user.save(function (err, user) {
            if (err) next(err);
            res.render('admin/profile', {user: user, active_profile: true, title: '博客信息'});
        });
    });

module.exports = router;
