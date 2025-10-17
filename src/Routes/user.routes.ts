import { Router } from "express";
import {
  createUser,
  logInUser,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/user.controller.ts";
import authenticate from "../Middleware/auth.middleware.ts";
import {authorizeRoles} from "../Middleware/rbac.middleware.ts";


const router = Router();
//signUp route
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: EMployee created successfully
 */



router.post("/auth/signUp", createUser);

//login route

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: employeenot found
 */
router.post("/auth/logIn", logInUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved all employees
 */


router.get("/", authenticate,authorizeRoles("HR"), getAllEmployees);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single employee by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: employee retrieved successfully
 *       404:
 *         description: employee not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

router.get("/:id", authenticate,authorizeRoles("HR"), getEmployeeById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The employee's MongoDB ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description:employee updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: User not found
 */
router.put("/:id",authenticate,authorizeRoles("HR"), updateEmployee);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's MongoDB ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: employee deleted successfully
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: User not found
 */
router.delete("/:id",authenticate,authorizeRoles("HR"), deleteEmployee);

export default router;
