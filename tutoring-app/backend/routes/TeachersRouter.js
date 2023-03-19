import express from "express";
import createError from "http-errors";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import StudentModel from "../models/Student.js";
import TeacherModel from "../models/Teacher.js";

//^ Define the student router
const TeachersRouter = express.Router();

//^ Registering teacher endpoint
TeachersRouter.post("/register", async (req, res, next) => {
  try {
    //^ profile picture
    // console.log(req.body);
    // console.log(req.files["selectedFile"][0]);
    // req.body.profile = req.files["selectedFile"][0];

    //^ hashing password in the backend
    const hashed = await hash(req.body.password, 10);
    //^ reassigning
    req.body.password = hashed;
    const newTeacher = await TeacherModel.create(req.body);
    res.send(newTeacher);
  } catch (error) {
    next(createError(401, error.message));
  }
})
  //^ Login teacher endpoints
  .post("/login", async (req, res, next) => {
    try {
      //^ Check if user email exists
      const teacher = await TeacherModel.findOne({ email: req.body.email });
      if (!teacher) {
        next(createError(401, "Wrong address"));
        return;
      }
      //^ Comparing the password
      const successLogin = await compare(req.body.password, teacher.password);
      if (!successLogin) {
        next(createError(401, "Email/password incorrect"));
        return;
      }
      //^ Token
      //^ token expiring time, if it expires, log in again
      const option = { expiresIn: "60min" };
      const token = jwt.sign({ id: teacher._id }, process.env.SECRET, option);
      //^ send user and token to front end
      res.send({ teacher, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  })
  //^ get all teachers
  .get("/allTeachers", async (req, res, next) => {
    try {
      const allTeachers = await TeacherModel.find();
      res.send(allTeachers);
    } catch (error) {
      next(createError(500, error.message));
    }
  });
export default TeachersRouter;
