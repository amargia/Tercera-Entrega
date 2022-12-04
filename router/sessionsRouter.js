import { Router } from "express";
import auth from "../middlewares/auth.js";

const sessions = Router();

import { usuariosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";

sessions.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    logger.info(`El usuario ${user} ha accedido a la ruta /sessions - ${method} [${time}]`);
    res.status(200).json({data: user});
})


export { sessions };