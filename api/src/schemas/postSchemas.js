const { z } = require("zod");

const createPostSchema = z.object({
  title: z.string().min(3, "title deve ter pelo menos 3 caracteres"),
  content: z.string().min(10, "content deve ter pelo menos 10 caracteres")
});

const updatePostSchema = createPostSchema.partial().refine(
  (payload) => Object.keys(payload).length > 0,
  "envie ao menos um campo para atualizar"
);

module.exports = {
  createPostSchema,
  updatePostSchema
};
