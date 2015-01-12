/**
 * Created by harttle on 1/12/15.
 */

// custom render:
// add req, res into locals

module.exports = function (req, res, next) {

    var origRender = res.render;

    res.render = function (view, locals, callback) {

        // optional locals
        if ('function' == typeof locals) {
            callback = locals;
            locals = undefined;
        }

        if (!locals) locals = {};
        locals.req = req;
        locals.res = res;

        origRender.call(res, view, locals, callback);
    };

    next();
};