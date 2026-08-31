import { initDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { routes } from "./router/routes.js";

dotenv.config();
const PORT = process.env.PORT || 5432;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.get('/',(req,res) => res.json({ok:true}))

app.use('/api',routes)


initDB()

app.listen(PORT, () => {
    return console.log(`Escuchando el puerto http://localhost:${PORT}`)
})



