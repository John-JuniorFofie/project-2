import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../Middleware/auth.middleware.js";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data found." });
    }

    const userRole = req.user.role; // role should come from JWT payload

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: You don’t have permission." });
    }

    next(); // user has correct role
  };
};
