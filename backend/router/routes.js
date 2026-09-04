import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { propuestasRoute } from "./propuestas.routes.js";

export const routes =  Router();

routes.use("/",authRouter);
routes.use("/",userRouter);
routes.use("/", propuestasRoute)

