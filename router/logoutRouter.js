import { Router } from "express";
const logout = Router();

import { usuariosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";

logout.get("/", async (req, res) => {
    const datosUsuario = await usuariosDao.getById(req.user._id);
    const user = datosUsuario.username;

    req.session.destroy((error) => {
        if (error) {
            logger.error(error);
            res.status(500).send("Error al cerrar sesión");
        } else {
            const { method } = req;
            const time = new Date().toLocaleString();
            logger.info(`El usuario ${user} ha cerrado sesión - ${method} [${time}]`);
            res.render("logout", {user});
        }
    });
});

export { logout };