import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";

// Middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { protectRoute } from "./middleware/protectRouteMiddleware.js";

// Routes ---
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import masterRouter from "./routes/masterRouter.js";
import reportRouter from "./routes/reportRouter.js";
import applicationRouter from "./routes/applicationRouter.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(expressFileUpload());

// API starts ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/master", masterRouter);
app.use("/api/v1/reports", protectRoute, reportRouter);
app.use("/api/v1/applications", applicationRouter);
// API ends ---

const port = process.env.APP_PORT || 3001;

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: `not found` });
});

// app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
