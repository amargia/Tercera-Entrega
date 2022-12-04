import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);