/**
 * Created by harttle on 1/29/15.
 */
// env dependent config file

module.exports = {
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.pku.edu.cn',
        port: process.env.SMTP_PORT || 25,
        ignoreTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    protocol: process.env.NODE_PROTOCOL || 'http',
    env:  process.env.NODE_ENV  || 'development',
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1'
};