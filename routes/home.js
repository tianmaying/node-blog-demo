/**
 * Created by harttle on 1/7/15.
 */

var router = require('express').Router();
var Post = require('../models/post.js');
var authRequired = require('../utils/auth-required');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
require('mongoose-query-paginate');

router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.render('home/index', {
            users: users,
            title: 'TMY BLOG: 一个简单的博客系统'
        });
    });
});

router.get('/home', authRequired, function (req, res, next) {
    res.redirect('/user/' + req.user.id);
});

router.get('/user/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, author) {
        if (err || !author) return next(err);

        var cond = {author: req.params.id};

        var options = {
            perPage: 5,
            delta: 2,
            page: req.query.page || 1
        };

        Post.find(cond)
            .sort({_id: -1})
            .paginate(options, function (err, pager) {
                if (err) return next(err);
                res.render('home/user', {
                    pager: pager,
                    title: author.username + ' 的首页',
                    author: author
                });
            });
    });
});

router.route('/post/:id')
    .get(function (req, res, next) {
        Post.findById(req.params.id)
            .populate('author comments')
            .exec(function (err, post) {
                if (err) return next(err);

                Comment.populate(post.comments, 'author');
                res.render('home/post', {
                    post: post,
                    title: post.title,
                    author: post.author
                });
            });
    })
    .post(authRequired, function (req, res, next) {
        Post.findById(req.params.id, function (err, post) {
            if (err) return next(err);

            var comment = new Comment({author: req.user.id, content: req.body.content});
            comment.save(function (err, comment) {
                if (err) return next(err);

                post.comments.push(comment.id);
                post.save(function (err, post) {
                    if (err) return next(err);

                    res.send({author: req.user.username, content: comment.content});
                });
            });
        });
    });

module.exports = router;