import jwt from "jsonwebtoken";

export const authenticationMiddleware = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({
      status: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};
