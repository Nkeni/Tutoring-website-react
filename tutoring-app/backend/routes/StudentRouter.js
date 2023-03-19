import express from "express";
import createError from "http-errors";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import StudentModel from "../models/Student.js";
import multer from "multer";
import path from "path";
import TeacherModel from "../models/Teacher.js";

//^ after saving the upload folder is created automatically
const upload = multer({ dest: "uploads/" });

//! Upload middleware
const uploadMiddleware = upload.fields([{ name: "selectedFile", maxCount: 1 }]);

//^ Define the student router
const StudentRouter = express.Router();

//^ Registering student endpoint
StudentRouter.post("/register", uploadMiddleware, async (req, res, next) => {
  try {
    //^ profile picture
    console.log(req.body);
    console.log(req.files["selectedFile"][0]);
    req.body.profile = req.files["selectedFile"][0];

    //^ hashing password in the backend
    const hashed = await hash(req.body.password, 10);
    //^ reassigning
    req.body.password = hashed;
    const newStudent = await StudentModel.create(req.body);
    res.send(newStudent);
  } catch (error) {
    next(createError(401, error.message));
  }
})
  //^ Login student endpoints
  .post("/login", async (req, res, next) => {
    try {
      //^ Check if user email exists
      const student = await StudentModel.findOne({ email: req.body.email });
      if (!student) {
        next(createError(401, "Wrong address"));
        return;
      }
      //^ Comparing the password
      const successLogin = await compare(req.body.password, student.password);
      if (!successLogin) {
        next(createError(401, "Email/password incorrect"));
        return;
      }
      //^ Token
      //^ token expiring time, if it expires, log in again
      const option = { expiresIn: "60min" };
      const token = jwt.sign({ id: student._id }, process.env.SECRET, option);
      //^ send user and token to front end
      res.send({ student, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  })
  //^ get the image
  .get("/profile/:filename", async (req, res, next) => {
    try {
      const user = await StudentModel.findOne({
        "profile.filename": req.params.filename,
      });
      const absoluteAvatarPath = path.resolve("./", user.profile.path);
      console.log(absoluteAvatarPath);
      res.sendFile(absoluteAvatarPath);
    } catch (error) {
      next(createError(400, error.message));
    }
  });
export default StudentRouter;
