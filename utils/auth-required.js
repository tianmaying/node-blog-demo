
// authentication check
// return authenticated ? router : redirect

module.exports = function(router, loginUrl){

  return function(req,res,next){
    if(req.user)
      return router(req,res,next);

    return res.redirect((loginUrl ||'/account/login') + '?next=' + req.originalUrl);
  }
};
