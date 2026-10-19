export function notFoundMiddlerware(req, res, next) {
  res.status(404).json({
    status: false,
    message: `Not found ${req.url}`,
    method: req.method,
  });
}