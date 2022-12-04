import { Router } from 'express';
const loginError = Router();

import { logger } from '../logs/loggers.js';

loginError.get("/", (req, res) =>{
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.error(`Ruta /loginError - ${method} [${time}]`)
    res.render("loginError", { error: "Usuario o contraseña incorrectos", url: "/login" });
})

export { loginError };