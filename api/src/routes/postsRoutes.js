const { Router } = require("express");
const { prisma } = require("../utils/prisma");
const { PostsRepository } = require("../repositories/postsRepository");
const { PostsService } = require("../services/postsService");
const { PostsController } = require("../controllers/postsController");

const router = Router();

const postsRepository = new PostsRepository(prisma);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);

router.get("/search", postsController.search);
router.get("/", postsController.list);
router.get("/:id", postsController.getById);
router.post("/", postsController.create);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.remove);

module.exports = { postsRouter: router };
