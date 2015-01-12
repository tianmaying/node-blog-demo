var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var crypto = require('crypto');

var UserSchema = new Schema({
    username: String,           //用户名
    password: String,
    title: String,              //博客名
    description: String,        //博客描述
    active: {                   //激活状态
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose, {
    incorrectUsernameError: '用户名不正确',
    incorrectPasswordError: '密码不正确',
    userExistsError: '用户名已存在'
});


UserSchema.path('username').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, '用户名不是有效的电子邮件地址');

module.exports = mongoose.model('User', UserSchema);
