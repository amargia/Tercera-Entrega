import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: { type: Array, required: true },
    userId: { type: String, required: true },
});

export const Cart = mongoose.model("cart", CartSchema);