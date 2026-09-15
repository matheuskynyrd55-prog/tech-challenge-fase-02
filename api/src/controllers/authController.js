const { loginSchema } = require("../schemas/authSchemas");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res, next) => {
    try {
      const payload = loginSchema.parse(req.body);
      const result = this.authService.login(payload);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = { AuthController };