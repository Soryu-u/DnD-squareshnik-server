import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

async function start() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
            `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@vallhalla.on1lar0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )
        
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();    
