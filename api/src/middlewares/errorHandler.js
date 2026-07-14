const { ZodError } = require("zod");

function errorHandler(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "validation_error",
      message: "Dados invalidos",
      details: error.errors.map((item) => ({
        path: item.path.join("."),
        message: item.message
      }))
    });
  }

  if (error && error.statusCode) {
    return res.status(error.statusCode).json({
      error: "request_error",
      message: error.message
    });
  }

  return res.status(500).json({
    error: "internal_error",
    message: "Erro interno do servidor"
  });
}

module.exports = { errorHandler };
