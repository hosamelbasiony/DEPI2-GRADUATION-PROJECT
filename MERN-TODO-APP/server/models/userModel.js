import mongoose from "mongoose";

// name: Joi.string().min(3).max(50).required(),
// email: Joi.string().min(5).max(255).required().email(),
// password: Joi.string().min(3).max(255).required()

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Must provide an email."],
        unique: [true, "Email must be unique."],
    },
    name: {
        type: String,
        required: [true, "Must provide a full name."],
    },
    password: {
        type: String,
        required: [true, "Must provide a assword."],
    }
});

const User = mongoose.model("User", userSchema);

export default User;