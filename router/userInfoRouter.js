import { Router } from "express";
import auth from "../middlewares/auth.js";
const userInfo = Router();

import { usuariosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";

userInfo.get("/", auth, async (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const datosUsuario = await usuariosDao.getById(req.user._id);

    logger.info(`El usuario ${datosUsuario.username} ha accedido a la ruta /userInfo - ${method} [${time}]`);
    res.render("userInfo", {userData: datosUsuario});
})


export { userInfo };