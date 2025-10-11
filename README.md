Apollonia HR Management System

A modern and efficient Human Resource Management System (HRMS) built with Node.js, Express, TypeScript, and MongoDB.
The system is designed to help organizations like Apollonia streamline employee data management, improve workflow efficiency, and ensure secure access control through authentication and role-based authorization.

Table of Contents

Overview

Key Features

Project Structure

Technologies Used

API Overview/endpoints

Security & Middleware

Installation

The Apollonia HR Management System provides a RESTful backend API for managing employees and HR operations.
It’s built with scalability, security, and maintainability in mind, following the MVC architecture and REST API standards.

Administrators and HR personnel can:

Add, update, view, and delete employee records.

Manage user access through role-based permissions.

Secure endpoints using JWT authentication.

Key Features
 Employee Management

Create, read, update, and delete (CRUD) employees.

Each employee record includes:

Full name

Email (unique and validated)

Position

Department

Start date

Authentication & Authorization

JWT-based user authentication.

Role-Based Access Control (RBAC): Admins, HR, and Employees.

Secured API endpoints.

Middleware

Authentication Middleware → verifies user tokens.

RBAC Middleware → restricts routes based on user roles.

Logger Middleware → logs request activity.

Error Handler → catches and formats all server errors.

 Validation

Validates email patterns using regex (/^\S+@\S+\.\S+$/).

Ensures data consistency and prevents invalid inputs.

FOLDER STRUCTURE
src/
 ├── controllers/
 │     └── employee.controller.ts
 ├── middleware/
 │     ├── auth.middleware.ts
 │     ├── rbac.ts
 │     ├── logger.middleware.ts
 │     └── errorHandler.middleware.ts
 ├── models/
 │     └── employee.model.ts
 ├── routes/
 │     └── employee.routes.ts
 ├── config/
 │     └── db.config.ts
 ├── server.ts
 └── app.ts


Security & Middleware

JWT Authentication to protect all endpoints.

RBAC (Role-Based Access Control) to control access by user roles.

Centralized error handling for safe API responses.

Environment variables (.env) to protect sensitive data.

//enpoints

serverHealth= http://localhost:5000/

SignUp: http://localhost:5000/api/vi/signUp

LogIn = http://localhost:5000/api/v1/logIn

AllUsers = http://localhost:5000/api/v1/

OneUser = http://localhost:5000/api/v1/68e6e866bee6ff6217f6dbbb

Update = http://localhost:5000/api/v1/68e6e866bee6ff6217f6dbbb

Delete = http://localhost:5000/api/v1/68e6e93bbee6ff6217f6dbbf


Author

John Fofie
 VIre Agency — Backend Developer
🔗 GitHub: @John-JunioFofie