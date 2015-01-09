/**
 * Created by harttle on 1/7/15.
 */

var router = require('express').Router();
var Post = require('../models/post.js');
var authRequired = require('../utils/auth-required');
var User = require('../models/user.js');

router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.render('index', {users: users, title: '欢迎使用 Blog'});
    })
});

router.get('/home', authRequired(function (req, res, next) {
    res.redirect('/' + req.user.id);
}));

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function(err, author){
        if(err) return next(err);
        if(!author) next();

        var cond = {author: req.params.id};
        if (req.query.before)
            cond._id = {$lt: req.query.before};

        Post.find(cond)
            .sort({_id: -1})
            //.limit(req.query.limit || 5)
            .populate('author')
            .exec(function (err, posts) {
                if (err) return next(err);
                res.render('home/index', {posts: posts, author: author, title: author.username});
            });
    })
});

router.get('/post/:id', function (req, res, next) {
    Post.findById(req.params.id)
        .populate('author')
        .exec(function (err, post) {
            if (err) next(err);
            res.render('home/post', {post: post, title: post.title});
        })
});

module.exports = router;