import { Router } from "express";

const productsList = Router();

import { productosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";

productsList.get("/", async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const productos = await productosDao.list();
    logger.info(`Ruta /productos - ${method} [${time}]`);
    res.json(productos);
});

export { productsList };