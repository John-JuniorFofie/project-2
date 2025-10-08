import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  fullName: string;
  email: string;
  position?: string;
  department?: string;
  startDate?: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    position: {
      type: String,
      default: "",
      trim: true,
    },
    department: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
