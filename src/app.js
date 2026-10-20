import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import { route } from "./modules/auth/auth.routes.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";
import { notFoundMiddlerware } from "./middleware/notfound.middleware.js";
import { errorrHandlerMiddlerware } from "./middleware/errorhandler.middleware.js";
import { routes } from "./modules/users/user.routes.js";
import { router } from "./modules/posts/post.routes.js";
import { routers } from "./modules/comment/comment.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", route);
app.use("/api/users", routes);
app.use("/api/posts/", router);
app.use("/api/posts", routers);
app.use("/api/comments", routers);
app.use(notFoundMiddlerware);
app.use(errorrHandlerMiddlerware);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is Healthy",
  });
});

export default app;
