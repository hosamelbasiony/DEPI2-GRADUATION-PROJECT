import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3011;

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

// global error handler

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const error = err.message || "Inernal server error";
    res.status(statusCode).json({error})
});

app.listen(PORT, () => {
    console.log(`Server App Running on http://localhost:${PORT}`);
});