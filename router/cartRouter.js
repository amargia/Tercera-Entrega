import { Router } from "express";
import auth from "../middlewares/auth.js"

import { logger } from "../logs/loggers.js";

const cart = Router();


import { carritoDao } from "../contenedores/daos/index.js";
import { productosDao } from "../contenedores/daos/index.js";
import { usuariosDao } from "../contenedores/daos/index.js";

import { sendMailPurchase } from "../middlewares/nodemailer.js";
import { sendSMS } from "../middlewares/twilio.js";

cart.get("/list", async (req, res) => {
    const carts = await carritoDao.list()
    res.status(200).send(carts);
})

cart.get("/:id/productos", auth, (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    let id = req.params.id;
    carritoDao.getById(id)
    .then((data) => {
        logger.info(`Ruta /carrito - ${method} [${time}]`)
        res.status(201).json(data);
    });
})

cart.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const carts = await carritoDao.list();
    const cart = carts.find(el => el.userId == req.user._id)
    const datosUsuario = await usuariosDao.getById(req.user._id);
    logger.info(`Ruta /carrito - ${method} [${time}]`)
    // res.status(200).send({cart, userData: datosUsuario});
    res.render("cart", {cart, userData: datosUsuario});
})

cart.post("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    let userId = req.body.userId
    carritoDao.save(userId)
    .then((data) => {
        logger.info(`Ruta /carrito - ${method} [${time}]`)
        res.status(201).json(data);
    });
});

cart.delete("/:id", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    let id = req.params.id;
    carritoDao.deleteById(id)
    .then((data) => {
        logger.info(`Ruta /carrito - ${method} [${time}]`)
        res.status(201).json(data);
    })
});

cart.post("/:idCarrito/productos/:idProducto/", async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    let idCart = req.params.idCarrito;
    let idProduct = req.params.idProducto;

    const product = await productosDao.getById(idProduct)
    carritoDao.addProduct(idCart, product)
    .then((data) => {
        logger.info(`Ruta /carrito - ${method} [${time}]`)
        res.status(201).json(data);
    })
});

cart.delete("/:idCarrito/productos/:idProducto/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    let idCart = req.params.idCarrito;
    let idProduct = req.params.idProducto;

    carritoDao.deleteProduct(idCart, idProduct)
    .then((data) => {
        logger.info(`Ruta /carrito - ${method} [${time}]`)
        res.status(201).json(data);
    })
});

cart.get("/finalizar-compra", async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const username = datosUsuario.username;
    const email = datosUsuario.email;
    const phone = datosUsuario.phone;

    const carts = await carritoDao.list()
    const cart = carts.find(cart => cart.userId == req.user._id)
    const products = cart.products;

    const total = products.reduce((acc, product) => acc + product.price, 0);

    const id = cart._id

    // const data = {
    //     username,
    //     email,
    //     products,
    //     total
    // }

    // sendMailPurchase(data);
    // sendSMS(phone);

    try {
        await carritoDao.deleteAllProducts(id)
        logger.info(`Compra realizada con éxito - ${method} [${time}]`)
    } catch (error) {
        console.log(error);
    }
    res.json({ message: "succeded" })
});

export { cart };