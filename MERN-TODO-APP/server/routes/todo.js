import express from "express";
import * as todoController from "../controllers/todo.js"
import { verifyToken } from "../utils/verify.js";

const router = express.Router();



router.get("/", verifyToken, todoController.getAllTodos);

router.post("/", verifyToken, todoController.createTodo);

router.get("/:id", verifyToken, todoController.getTodo);

router.put("/:id", verifyToken, todoController.updateTodo);

router.delete("/:id", verifyToken, todoController.deleteTodo);


export default router;