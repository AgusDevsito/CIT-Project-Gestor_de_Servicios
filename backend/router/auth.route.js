import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controllers.js";


export const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/profile",profile);
authRouter.post("/logout",logout)