/**
 * Created by harttle on 1/29/15.
 */
// env dependent config file

module.exports = {
    smtp: {
        host: 'smtp.pku.edu.cn',
        port: 25,
        ignoreTLS: true,
        auth: {
            user: '1301213734@pku.edu.cn',
            pass: 'bdrj1800'
        }
    },
    protocol: 'http',
    host: '127.0.0.1',
    port: 3000
};