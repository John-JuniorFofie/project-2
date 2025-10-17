import type  { Request } from "express";

export interface AuthRequest extends Request {
  user?:{
    userId: string,
    role: string
  } // extend request to hold user data
}