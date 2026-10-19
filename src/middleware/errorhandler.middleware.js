export function errorrHandlerMiddlerware(err, req, res, next) {
  console.error("ERROR MESSAGE:", err.message);
  console.error("ERROR STACK:", err.stack);

  res.status(500).json({
    status: false,
    message: `Something went wrong ${req.url}`,
    method: req.method,
    body: null,
  });
}

export function notFoundMiddlerware(req, res, next) {
  res.status(404).json({
    status: false,
    message: `Not found ${req.url}`,
    method: req.method,
  });
}
