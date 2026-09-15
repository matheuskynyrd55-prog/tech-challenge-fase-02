const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(2, "content deve ter pelo menos 2 caracteres")
});

module.exports = {
  createCommentSchema
};