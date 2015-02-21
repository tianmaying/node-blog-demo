var express = require('express');
var User = require('../../models/user.js');
var Post = require('../../models/post.js');
var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        Post.find({author: req.user.id}, function(err, posts){
            if(err) return next(err);

            res.render('admin/posts', {
                user: req.user,
                active_post: true,
                posts: posts,
                title: '管理博客'
            });
        });
    });

router.route('/new')
    .get(function (req, res) {
        res.render('admin/post', {id: 'new', title: '编辑博文'});
    })
    .post(function (req, res, next) {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        }, function (err, post) {
            if (err) return next(err);
            else return res.redirect('/admin/post');
        });
    });

router.route('/:id')
    .get(function (req, res) {
        Post.findById(req.params.id, function (err, post) {
            if (err) next(err);
            return res.render('admin/post', {post: post, id: post.id, title: '编辑博文'});
        });
    })
    .post(function (req, res) {
        Post.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content
            },
            function (err, post) {
                if (err) return next(err);
                return res.redirect('/admin/post');
            });
    })
    .delete(function(req, res, next){
        Post.findByIdAndRemove(req.params.id,function(err, rows){
            if(err) return next(err);
            res.end();
        });
    });


module.exports = router;
