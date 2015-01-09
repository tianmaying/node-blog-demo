
// do authentication check
// return authenticated ? router : redirect
// 
module.exports = function(router, loginUrl){

  return function(req,res,next){
    if(req.user){

      // override res.render: add req.user
      var origRender = res.render;
      res.render = function (view, locals, callback) {
        if ('function' == typeof locals) {
          callback = locals;
          locals = undefined;
        }
        if (!locals) locals = {};
        locals.user = req.user;

        origRender.call(res, view, locals, callback);
      };

      router(req,res,next);
    }
    else
      res.redirect((loginUrl ||'/account/login') + '?next=' + req.originalUrl);
  }
};
