export const sendError = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
    data,
  });
};
