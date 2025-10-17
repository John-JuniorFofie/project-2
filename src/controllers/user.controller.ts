import type { Request, Response } from "express";
import Employee from "../Models/user.model.ts";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import type { AuthRequest } from "../config/Helper/helper.ts";

  
dotenv.config({ path: "./.env" });
dotenv.config();

  // JWT secret
const { ACCESS_TOKEN_SECRET} = process.env;
  // if (!ACCESS_TOKEN_SECRET) {
  //   throw new Error("ACCESS_TOKEN_SECRET is not defined in .env");
  // }

  // @desc Register new user
  // @route POST /api/users/register
  // @access Public
export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, position, startDate, department, password, role } = req.body;

    // Input validation
    if (!fullName || !email || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Check for existing user
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new Employee({
      fullName,
      email,
      position,
      startDate,
      department,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


  //create new user 
  // export const createUser = async (req:Response, res:Response)=>{
  // const newUser: Employee = await UserSchema.create({
  //     fullName,
  //     email,
  //     position,
  //     startDate,
  //     department,
  //     password: hashed,
  // });

  //Login employee
export const logInUser = async (req: Request, res:Response)=>{
  try{
    const {email, password}= req.body;
    if(!email|| !password){

      return res.status(500).json({
        success:false, 
        message:"please provide email and password"});
    }

      const existingUser = await Employee.findOne({ email });
      if(!existingUser){
        return res.status(401).json({
          success:false,
          message:"User cannot be found"
        });
      }
      //check password
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if(!validPassword){
        res.status(400).json({
          success:false,
          message:"Invalid Credentials"
        });
        return
      }
    // create JWT token
    const accessToken = jwt.sign({
      userId: existingUser._id,
      email: existingUser.email,
      role: existingUser.role

    }, ACCESS_TOKEN_SECRET as string, {expiresIn: "1h"});

    //Remove password before sending a response
    const userWithoutPassword = existingUser.toObject() as any;
    delete userWithoutPassword.password;

    res. status(200).json({
      success:true, 
      message: "login successful",
      token: accessToken,
    });
  
  } catch(error){
    res.status(400).json({success:false, message:"failed to logIn", error})
  };
};



  // Get all employees
export const getAllEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const {userId} = (req as any).user;
    if(!userId){
      return res.status(401).json({
        success:false,
        message:"Unauthorized access"
      })
    }
    const employees = await Employee.find();
    if(!employees || employees.length ===0){
      return res.status(404).json({
        success:false,
        message:"No employee found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Employees fetched successfully",
      data:employees
    });
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to fetch employees", error });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({success:false, message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({success:false, message: "Error retrieving employee", error });
  }
};

// Update employee details
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({success:false, message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({success:false, message: "Failed to update employee", error });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ 
        success:false,
        message: "Employee not found" });
    }
    res.status(200).json({
      success:true, 
      message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success:false, message: "Failed to delete employee", error });
  }
};

