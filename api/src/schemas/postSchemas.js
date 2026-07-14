const { z } = require("zod");

const basePostSchema = z.object({
  title: z.string().min(3, "title deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "content deve ter pelo menos 10 caracteres"),
  author: z.string().min(2, "author deve ter pelo menos 2 caracteres")
});

const createPostSchema = basePostSchema;

const updatePostSchema = basePostSchema.partial().refine(
  (payload) => Object.keys(payload).length > 0,
  "envie ao menos um campo para atualizar"
);

module.exports = {
  createPostSchema,
  updatePostSchema
};
