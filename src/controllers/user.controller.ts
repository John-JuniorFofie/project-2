import type { Request, Response } from "express";
import Employee from "../Models/user.model.ts";
import bcrypt from "bcrypt";

// Create a new employee
// export const createEmployee = async (req: Request, res: Response) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create employee", error });
//   }
// };


//@route /
//@desc Create new user
//@access Public
export const createUser = async (req: Request, res: Response) => {
  try {
    const {fullName, email, position, startDate, department,password, role} = req.body;

    //input validation
    if(!fullName|| !email || !role || password ){
      res.status(403).json({
        success:false,
        message:"Fill in all required inputs"
      })
    }

    //check for user existence 
    const  existingUser = await Employee.findOne(email);
    console.log(existingUser)
    
    //save user
    const newUser = new Employee({
    fullName,
    email,
    position,
    startDate,
    department,
    password,
    });
    await newUser.save();

    
    res.status(201).json({
     success:true,
      message:"Employee created successfully",
      data: newUser,
    });

  } catch (error) {
    res.status(400).json({success:false, message: "Failed to create employee", error });
    return;
  }
};
//Login employee
export const logInUser = async (req: Request, res:Response)=>{
  try{
    const {email, password}= req.body;
    if(!email|| !password){

      return res.status(500).json({success:false, message:"please provide email and password"});
    }
    res. status(200).json({success:true, message: "login successful"});
  
    }
    catch(error){
    res.status(400).json({success:false, message:"failed to logIn", error})
};
  };



// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
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

