import mongoose, { Schema, models } from "mongoose";

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/defaultpp.webp",
    },
    role: {
      type: String,
      required: true,
    },
    teachersId: {
      type: Array,
    },
    studentsId: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Account = models.Account || mongoose.model("Account", accountSchema);
export default Account;
