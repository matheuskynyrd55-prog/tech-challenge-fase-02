const { Router } = require("express");
const { prisma } = require("../utils/prisma");
const { PostsRepository } = require("../repositories/postsRepository");
const { PostsService } = require("../services/postsService");
const { PostsController } = require("../controllers/postsController");
const { buildRequireAuth, buildRequireRole } = require("../middlewares/authMiddleware");
const { authService } = require("./authRoutes");

const router = Router();

const postsRepository = new PostsRepository(prisma);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);
const requireAuth = buildRequireAuth(authService);
const requireTeacher = buildRequireRole("docente");

router.get("/search", postsController.search);
router.get("/", postsController.list);
router.get("/:id", postsController.getById);
router.post("/", requireAuth, requireTeacher, postsController.create);
router.put("/:id", requireAuth, requireTeacher, postsController.update);
router.delete("/:id", requireAuth, requireTeacher, postsController.remove);
router.post("/:id/comments", requireAuth, postsController.addComment);
router.post("/:id/likes", requireAuth, postsController.toggleLike);

module.exports = { postsRouter: router };
