import { initDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());