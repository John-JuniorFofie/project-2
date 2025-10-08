import type { Request, Response } from "express";
import Employee from "../Models/employee.model.ts";

// Create a new employee
// export const createEmployee = async (req: Request, res: Response) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to create employee", error });
//   }
// };

//create new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {fullName, email, position, startDate, department} = req.body;
    const newUser = new Employee({
    fullName,
    email,
    position,
    startDate,
    department,
    });
    await newUser.save();

    
    res.status(201).json({
      message:"Employee created successfully",
      data: newUser,
    });

  } catch (error) {
    res.status(400).json({ message: "Failed to create employee", error });
    return;
  }
};
//Login employee
export const logInEmployee = async (req: Request, res:Response)=>{
  try{
    const {email, password}= req.body;
    if(!email|| !password){

      return res.status(400).json({message:"please provide email and password"});
    }
    res. status(200).json({message: "login successful"});
  
    }
    catch(error){
    res.status(500).json({message:"provide the right credentials", error})
};
  };



// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees", error });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employee", error });
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
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: "Failed to update employee", error });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error });
  }
};
