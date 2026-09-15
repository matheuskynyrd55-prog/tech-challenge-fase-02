const { HttpError } = require("../utils/httpError");

function buildRequireAuth(authService) {
  return (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new HttpError(401, "Token de autenticacao ausente");
      }

      const token = authorization.replace("Bearer ", "").trim();

      if (!token) {
        throw new HttpError(401, "Token de autenticacao ausente");
      }

      const payload = authService.verifyToken(token);
      req.auth = payload;

      return next();
    } catch {
      return next(new HttpError(401, "Token invalido ou expirado"));
    }
  };
}

function buildRequireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.auth || req.auth.role !== requiredRole) {
      return next(new HttpError(403, "Voce nao tem permissao para esta operacao"));
    }

    return next();
  };
}

module.exports = { buildRequireAuth, buildRequireRole };