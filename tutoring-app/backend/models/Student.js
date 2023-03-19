import mongoose from "mongoose";

const { Schema, model } = mongoose;

//^ Profile picture Schema
const profileSchema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});

//^ Student Schema
const StudentSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      unique: [true, "Email already exists"],
      //^ custom validate to check if it is a valid email address
      validate: {
        validator: (val) => {
          //^ return tue if OK otherwise false
          if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) {
            return true;
          } else {
            return false;
          }
        },
        message: (val) => `"${val.value}" is NOT a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should not be less than 8 char"],
      //   maxLength: [16, "Password should not exceed 16 char"],
    },

    profile: {
      type: profileSchema,
    },
    //! connecting teacher collection into student collection
    // teacher: [{ type: Schema.Types.ObjectId, ref: "teacher" }],
  },
  //^ preventing the password to be shown in the front end
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//^ Student Model
const StudentModel = model("student", StudentSchema);
export default StudentModel;
