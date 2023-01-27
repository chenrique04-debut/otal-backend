const passport = require("passport");

module.exports = {
  basic: (req, res, next) => {
    passport.authenticate('basic', { session: false },
      (erro, user) => {  
        let code = (erro ? 500 : (!user ? 401 : 204));
        if (code == 204) {
          req.user = user;
          return next();
        }
        return res.status(code).send();
      }
    )(req, res, next);
  },
  bearer: (req, res, next) => {
    passport.authenticate('bearer', { session: false },
      (erro, user) => {
        if (erro)
          switch (erro.name) {
            case "JsonWebTokenError": return res.status(401).send("token inválido");
            case "TokenExpiredError": return res.status(401).send("token expirado");
            default: return res.status(500).send(erro);
          }
        if (!user)
          return res.status(401).send("acesso negado");
        req.user = user;
        return next();
      }
    )(req, res, next);
  },
  tutor: (req, res, next) => {
    const user = req.user;
    if(user.perfil!="tutor"){
      return res.status(401).send("acesso negado");
    }else{
       return next();
    }
  }
};
