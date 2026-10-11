import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser());

//cors configuration

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PATCH","DELETE","PUT","OPTIONS"],
    allowedHeaders:["Authorization","Content-Type"]
}));

app.use('/api/v1/healthCheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);

export default app;