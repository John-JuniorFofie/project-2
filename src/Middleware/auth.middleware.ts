import type  { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";



const JWT_SECRET = process.env.JWT_SECRET || "apollonia_secret"; // use .env in real projects



const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] as any;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({
       message: "Access denied. No token provided." 
      });
    }

   jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET as string,
  (error: jwt.VerifyErrors | null, user: any) => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid token",
      });
    }

    (req as any).user = user;
    next();
    });
    // const decoded = jwt.verify(token, JWT_SECRET);
    // let userId: string;
    // let role: string;

    // userId = decoded.userId;
    // req.user = { userId, role }; // attach user data to request
    // next();
  } catch (error) {
    return res.status(403).json({
      success:false, 
      message: "Invalid or expired token.", 
      error:error
      });
  }
};

export default authenticate;
