import { Router } from "express";
import auth from "../middlewares/auth.js";

const products = Router();

import { productosDao } from "../contenedores/daos/index.js";
import { usuariosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";

products.get("/", auth , async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    if (user.toLowerCase() !== 'admin') {
        logger.error(`El usuario ${user} no tiene permisos para acceder a la ruta - ${method} [${time}]`);
        res.status(403).send("No tiene permisos para acceder a esta ruta");
    }

    const productos = await productosDao.list();
    logger.info(`El usuario ${user} ha accedido a la ruta /productos - ${method} [${time}]`);
    res.render("products", { productos, user });
})

products.get("/:id", auth, (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    logger.info(`Ruta /productos/:id - ${method} [${time}]`);
    let id = req.params.id;
    productosDao.getById(id)
    .then((data) => {
    res.status(201).json(data);
    });
})

products.get("/editProduct/:id", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;
    let id = req.params.id;

    const producto = await productosDao.getById(id);

    if (user.toLowerCase() !== 'admin') {
        logger.error(`El usuario ${user} no tiene permisos para acceder a la ruta - ${method} [${time}]`);
        res.status(403).send("No tiene permisos para acceder a esta ruta");
    }

    logger.info(`Ruta /productos/editProduct/:id - ${method} [${time}]`);
    res.render("editProduct", { id: id, producto });
})

products.post("/", auth, (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    logger.info(`Ruta /productos - ${method} [${time}]`);

    const { name, description, code, thumbnail, price, stock } = req.body
    productosDao.save({name, description, code, thumbnail, price, stock})
    .then((data) => {
        res.status(201).json(data);
    });
});

products.delete("/:id", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    if (user.toLowerCase() !== 'admin') {
        logger.error(`El usuario ${user} no tiene permisos para acceder a la ruta - ${method} [${time}]`);
        res.status(403).send("No tiene permisos para acceder a esta ruta");
    }

    logger.info(`Ruta /productos/:id - ${method} [${time}]`);

    let id = req.params.id;
    productosDao.deleteById(id)
    .then((data) => {
        res.status(201).json(data);
    });
});

products.put("/editProduct", auth , async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    if (user.toLowerCase() !== 'admin') {
        logger.error(`El usuario ${user} no tiene permisos para acceder a la ruta - ${method} [${time}]`);
        res.status(403).send("No tiene permisos para acceder a esta ruta");
    }

    const { _id, name, description, code, thumbnail, price, stock } = req.body
    productosDao.updateById(_id, {name, description, code, thumbnail, price, stock})
    .then((data) => {
        logger.info(`Producto editado con éxito - Ruta /productos/editProduct - ${method} [${time}]`);
        res.status(201).json(data);
    });
});

export { products };