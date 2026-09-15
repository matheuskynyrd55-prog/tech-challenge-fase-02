const { Router } = require("express");
const { AuthController } = require("../controllers/authController");
const { AuthService } = require("../services/authService");

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/login", authController.login);

module.exports = {
  authRouter: router,
  authService
};