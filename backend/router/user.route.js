import { createUser, deleteUser, getallUsers, getUserbyID, updateUser } from "../controllers/user.controllers.js";
import {Router} from 'express';

export const userRouter = Router()

userRouter.get("/user/:id",getUserbyID)
userRouter.get("/users",getallUsers)
userRouter.put("/user/:id",updateUser)
userRouter.delete("/user/:id",deleteUser)
userRouter.post("/user/create",createUser)