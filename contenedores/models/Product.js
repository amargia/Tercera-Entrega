import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    price: { type: Number, required: true, default: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
});

export const Product = mongoose.model("products", ProductSchema);