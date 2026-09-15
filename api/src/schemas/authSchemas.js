const { z } = require("zod");

const loginSchema = z.object({
  username: z.string().min(2, "username deve ter pelo menos 2 caracteres"),
  password: z.string().min(4, "password deve ter pelo menos 4 caracteres")
});

module.exports = { loginSchema };