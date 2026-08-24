import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { userRouter } from "./user.route.js";

export const routes =  Router();

routes.use("/",authRouter);
routes.use("/",userRouter);
