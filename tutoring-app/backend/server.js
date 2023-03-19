import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import connect from "./lib/db.js";
import StudentRouter from "./routes/StudentRouter.js";
import TeachersRouter from "./routes/TeachersRouter.js";

//^ enable .env
dotenv.config();

//^ connect to MongoDB
connect();

//^ define port
const port = process.env.PORT || 5000;

//^ define server
const server = express();

server.use(logger("dev"));
server.use(cors());
//^ enable body request (POST) object parsing
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//^ start the routes
//! Student api
server.use("/api/students", StudentRouter);
//! Teacher api
server.use("/api/teachers", TeachersRouter);

//^ something else error
server.use("*", (req, res, next) => {
  next(createError(404, "Page Not Found"));
});

//^ global error handler
server.use((error, req, res, next) => {
  res
    .status(error.status || 400)
    .send({ message: error.message || "unknown error" });
});

//^ start the server
server.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}`);
});
