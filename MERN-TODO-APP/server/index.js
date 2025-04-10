import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 4311;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/user", AuthRoute);
app.use("/api/todo", TodoRoute);
// app.use("/api/healthcheck", (req, res) => {
//     res.status(200).json({message: "Server is up and running"});
// });

// global error handler

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const error = err.message || "Inernal server error";
    res.status(statusCode).json({error})
});

app.use('*', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server App Running on http://localhost:${PORT}`);
});