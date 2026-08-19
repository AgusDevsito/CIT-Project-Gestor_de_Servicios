import { initDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { userRouter } from "./router/user.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get('/',(req,res) => res.json({ok:true}))

app.use('/api',userRouter)

app.use(cors());


initDB()

app.listen(PORT, () => {
    return console.log(`Escuchando el puerto http://localhost:${PORT}`)
})



