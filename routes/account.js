var passport = require('passport');
var router = require('express').Router();
var mailer = require('../utils/mailer');
var User = require('../models/user');
var Post = require('../models/post');
var crypto = require('crypto');
var fs = require('fs');
var config = require('../config');

router.route('/register')
    .get(function (req, res) {
        res.render('account/register', {title: '注册'});
    })
    .post(function (req, res, next) {
        User.register(new User({username: req.body.username}), req.body.password,
            function (err, user) {
                if (err)
                    return res.status(400).send(err.message || '未知原因');

                crypto.randomBytes(20, function (err, buf) {
                    user.activeToken = user._id + buf.toString('hex');
                    user.activeExpires = Date.now() + 24 * 3600 * 1000;   // 24 hour

                    var link = config.schema + config.outerHost + ':' + config.outerPort + '/account/active/' + user.activeToken;
                    mailer.send({
                        to: req.body.username,
                        subject: '欢迎注册 TMY BLOG',
                        html: '请点击 <a href="' + link + '">此处</a> 激活。'
                    });

                    user.save(function(err, user){
                        if(err) return next(err);
                        res.send('已发送邮件至' + user.username + '，请在24小时内按照邮件提示激活。');
                    });
                });
            });
    });

router.get('/active/:activeToken', function (req, res, next) {
    User.findOne({
        activeToken: req.params.activeToken,
        activeExpires: {$gt: Date.now()}
    }, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return res.render('message', {
                title: '激活失败',
                content: '您的激活链接无效，请重新 <a href="/account/signup">注册</a>'
            });
        }

        user.active = true;
        user.save(function (err, user) {
            if (err) return next(err);

            fs.readFile(process.cwd() + '/data/demo.md', function (err, data) {
                if (err) return next(err);
                Post.create({
                    title: '欢迎使用TMY博客',
                    content: data,
                    author: user.id
                });
            });

            res.render('message', {
                title: '激活成功',
                content: user.username + '已成功激活，请前往 <a href="/account/login">登录</a>'
            });
        });
    });
});

router.route('/forgot')
    .get(function (req, res) {
        res.render('account/forgot', {title: '忘记密码'});
    })
    .post(function (req, res, next) {
        User.findOne({username: req.body.username}, function (err, user) {
            if (err) return next(err);
            if (!user)   return res.render('message', {
                title: '重置密码失败',
                content: '未找到用户名：' + req.body.username
            });

            crypto.randomBytes(20, function (err, buf) {
                user.resetPasswordToken = buf.toString('hex');
                user.resetPasswordExpires = Date.now() + 3600000;   // 1 hour

                var link = config.schema + config.outerHost + ':' + config.outerPort + '/account/reset/' + user.resetPasswordToken;
                user.save(function (err, user) {
                    if (err) return next(err);
                    mailer.send({
                        to: req.body.username,
                        subject: '重置您的密码',
                        html: '请在一个小时内点击 <a href="' + link + '">此处</a> 完成重置。'
                    });
                    res.render('message', {
                        title: '已发送密码重置邮件',
                        content: '已发送邮件至' + user.username + '，请按照邮件提示重置密码。'
                    });
                });
            });
        });
    });

router.route('/reset/:token')
    .get(function (req, res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }, function (err, user) {
            if (err) return next(err);
            if (!user)
                return res.render('message', {
                    title: '重置密码失败',
                    content: '重置链接无效或已过期。'
                });
            res.render('account/reset', {
                title: '重置您的密码',
                user: user
            });
        });
    })
    .post(function (req, res) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }, function (err, user) {
            if (err) return next(err);
            if (!user)
                return res.render('message', {
                    title: '重置密码失败',
                    content: '重置链接无效或已过期。'
                });

            user.setPassword(req.body.password, function (err, user) {
                if (err) return next(err);
                user.save(function (err, user) {
                    if (err) return next(err);
                    res.render('message', {
                        title: '重置密码成功',
                        content: user.username + '的密码已成功重置，请前往<a href="' +
                        config.schema + config.outerHost + ':' + config.outerPort + '/account/login">登录</a>。'
                    });
                });
            });
        });
    });

router.route('/login')
    .get(function (req, res) {
        res.render('account/login', {title: '登录'});
    })
    .post(passport.authenticate('local'), function (req, res, next) {
        if (!req.user.active) {
            req.logout();   // delete req.user & clear login session
            res.status(400);
            return res.send('Unactived');
        }
        res.end();
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/account/login');
});


module.exports = router;
