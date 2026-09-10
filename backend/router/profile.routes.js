import { Router } from "express";
import {
    getAllProfiles,
    getProfileByUserId,
    updateProfile,
} from "../controllers/profile.controllers.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const profileRouter = Router();

// Las operaciones de perfiles requieren una cuenta autenticada.
profileRouter.get("/profiles", requireAuth, getAllProfiles);
profileRouter.get("/profile/:userId", requireAuth, getProfileByUserId);
profileRouter.put("/profile/:userId", requireAuth, updateProfile);