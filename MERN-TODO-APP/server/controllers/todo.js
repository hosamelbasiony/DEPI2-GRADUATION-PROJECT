
import Joi from "joi";
import { connectToDB } from "../utils/connect.js";
import { createError } from "../utils/error.js";
import Todo from "../models/todoModel.js";

const validateTodo = (data, abortEarly = false) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Name"),
        isCompleted: Joi.boolean().label("Is Completed").allow(null)
    });
    return schema.validate(data, { abortEarly });
};


export async function getAllTodos(req, res, next) {
    await connectToDB();

    const todos = await Todo.find({
        userId: req.user.id
    });

    res.json(todos);
};

export async function createTodo(req, res, next) {
    let data = req.body;
    
    const { error } = validateTodo(data);

    if (error) {

        const errors = error.details.reduce(
            (accumulator, currentValue) => accumulator = [...accumulator, currentValue.message],
            [],
        );

        return (next(createError(400, errors.join("\n"))));
    }

    await connectToDB();

    const newTodo = new Todo({
        title: data.title,
        userId: req.user.id
    });

    await newTodo.save();

    res.status(201).json(newTodo);
};

export async function getTodo(req, res, next) {

    await connectToDB();

    const todo = await Todo.findById(req.params.id);

    if (!todo) return (next(createError(404, "Todo not found!")));

    if (todo?.userId != req.user.id) return (next(createError(404, "Not authorized!")));

    res.json(todo);
};

export async function updateTodo(req, res, next) {
    const id = req.params.id;

    const { error } = validateTodo(req.body);

    if (error) {

        const errors = error.details.reduce(
            (accumulator, currentValue) => accumulator = [...accumulator, currentValue.message],
            [],
        );

        return (next(createError(400, errors.join("\n"))));
    }

    try {

        await connectToDB();

        const todo = await Todo.findById(req.params.id);

        if (!todo) return (next(createError(404, "Todo not found!")));

        if (todo?.userId != req.user.id) return (next(createError(404, "Not authorized!")));

        todo.title = req.body.title || todo.title;
        if (req.body.isCompleted != undefined) todo.isCompleted = req.body.isCompleted;

        await todo.save();

        res.json(todo);

    } catch (ex) {
        return (next(createError(404, "Todo not found!")));
    }
};

export async function deleteTodo(req, res, next) {

    try {
        await connectToDB();

        const todo = await Todo.deleteOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (todo.deletedCount < 1 ) return (next(createError(404, "Todo not found!")));

        res.json({message: "Todo deleted"});
    } catch (ex) {
        return (next(createError(404, "Todo not found!")));
    }
};

