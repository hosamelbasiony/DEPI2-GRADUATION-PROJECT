import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { EOL } from "node:os";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const validate = (data, abortEarly = false) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        name: Joi.string().required().label("Name"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data, { abortEarly });
};

const validateLogin = (data, abortEarly = false) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data, { abortEarly });
};

export async function login(req, res, next) {

    const data = req.body;

    const { error } = validateLogin(data, true);

    if (error) {

        const errors = error.details.reduce(
            (accumulator, currentValue) => accumulator = [...accumulator, currentValue.message],
            [],
        );

        return (next(createError(400, errors.join(EOL))));
    }

    await connectToDB();

    const user = await User.findOne({ email: data.email })
    if (!user) return (next(createError(400, "Invalid credentials.")));

    const passwordMatch = bcrypt.compareSync(data.password, user.password);
    if (!passwordMatch) return (next(createError(400, "Invalid credentials.")));

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT)

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"
    }).status(200).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
};

export async function register(req, res, next) {

    const data = req.body;

    const { error } = validate(data);

    if (error) {

        const errors = error.details.reduce(
            (accumulator, currentValue) => accumulator = [...accumulator, currentValue.message],
            [],
        );

        return (next(createError(400, errors.join(EOL))));
    }

    await connectToDB();

    const user = await User.exists({ email: data.email })
    if (user) return (next(createError(400, "User already exists.")));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const newUser = new User({
        ...data,
        password: hash
    });
    await newUser.save();

    res.status(201).json(newUser);
};

export async function logout(req, res, next) {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"
    }).status(200).json({
        message: "User logged out successfully."
    });
};

export async function profile(req, res, next) {
    res.json({user: req.user});
};