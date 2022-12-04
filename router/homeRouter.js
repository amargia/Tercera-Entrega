import { Router } from 'express';
import auth from '../middlewares/auth.js';
const home = Router();

import {logger} from '../logs/loggers.js';

import { carritoDao } from '../contenedores/daos/index.js';
import { productosDao } from '../contenedores/daos/index.js';
import { usuariosDao } from '../contenedores/daos/index.js';

home.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const carts = await carritoDao.list()
    const cart = carts.find(cart => cart.userId == req.user._id)
    
    if(!cart) {
        const newCart = await carritoDao.save(req.user._id)
        const datosUsuario = await usuariosDao.getById(req.user._id);
        const productos = await productosDao.list();
        logger.info(`Ruta / - ${method} [${time}]`)
        res.render("home", {cart: newCart, userData: req.user, productos});
    } else {
        const datosUsuario = await usuariosDao.getById(req.user._id);
        const productos = await productosDao.list();
        logger.info(`Ruta / - ${method} [${time}]`)
        res.render("home", {cart, userData: req.user, productos});
    }
})

export { home };