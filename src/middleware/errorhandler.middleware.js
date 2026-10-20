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


