import { Router } from "express";
import {
  createEmployee,
  logInEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.ts";

const router = Router();
//signUp route
router.post("/signUp", createEmployee);

//login route
router.post("/logIn", logInEmployee);

router.get("/", getAllEmployees);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
