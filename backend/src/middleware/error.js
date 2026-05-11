export function notFound(req, res, _next) {
  res.status(404).json({ message: `Not found: ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || (err.code === 11000 ? 409 : 500);
  const message =
    err.code === 11000 ? "Email already in use" : err.message || "Server error";
  if (process.env.NODE_ENV !== "production") console.error(err);
  res.status(status).json({ message });
}
