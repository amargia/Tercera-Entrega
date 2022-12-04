import { Router } from 'express';
import passport from '../middlewares/passport.js';

const login = Router();

import { logger } from '../logs/loggers.js';

login.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();
    logger.info(`Ruta /login ${method} - [${time}]`);
    res.render("login");
});

login.post("/", passport.authenticate("local", {failureRedirect: "/loginError"}),
    (req, res) => {
        const { method } = req;
        const time = new Date().toLocaleString();
        logger.info(`Login exitoso - Ruta /login ${method} - [${time}]`);
        res.redirect("/");
    }
);

export { login };