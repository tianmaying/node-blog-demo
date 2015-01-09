/**
 * Created by harttle on 1/5/15.
 */

var nodemailer = require('nodemailer');
var _extend = require('util')._extend;

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.pku.edu.cn',
    port: 25,
    ignoreTLS: true,
    auth: {
        user: '1301213734@pku.edu.cn',
        pass: 'bdrj1800'
    }
});

var defaultMailOptions = {
    from: '天马营教程 <1301213734@pku.edu.cn>',
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