const { Router } = require("express");
const { postsRouter } = require("./postsRoutes");

const router = Router();

router.use("/posts", postsRouter);

module.exports = { apiRouter: router };
