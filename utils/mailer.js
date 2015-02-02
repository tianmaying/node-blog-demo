/**
 * Created by harttle on 1/5/15.
 */

var nodemailer = require('nodemailer');
var _extend = require('util')._extend;
var config = require('../config');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(config.smtp);

var defaultMailOptions = {
    from: '天马营教程 <notification@tianmaying.com>',
    subject: 'test',
    //to: 'bar@blurdybloop.com, baz@blurdybloop.com',
    //text: 'test text',
    html: '<b>test html</b>'
};

function sendMail(config){
    var mailOptions = _extend(defaultMailOptions, config);

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports = {
    send: sendMail
};
