const { Router } = require("express");
const { postsRouter } = require("./postsRoutes");
const { authRouter } = require("./authRoutes");

const router = Router();

router.use("/posts", postsRouter);
router.use("/auth", authRouter);

module.exports = { apiRouter: router };
