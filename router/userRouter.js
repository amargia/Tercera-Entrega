import { Router } from "express";
const user = Router();

import { usuariosDao } from "../contenedores/daos/index.js";

import { logger } from "../logs/loggers.js";
import { sendMail } from "../middlewares/nodemailer.js";

import { upload } from "../middlewares/multer.js";

user.get("/", (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    logger.info(`El usuario ha accedido a la ruta /user - ${method} [${time}]`);
    res.render('register');
})

user.post("/", upload.single('avatar'), (req, res) => {
    const { method } = req;
    const time = new Date().toLocaleString();

    const file = req.file;
    const image = file.filename;

    const { name, username, email, password, age, phone, address, avatar } = req.body;
    usuariosDao.save({ name, username, email, password, age, phone, address, image })
    .then((user) => {
        if(user) {
            // sendMail(user);
            logger.info(`El usuario ${username} se ha registrado correctamente - ${method} [${time}]`);
            res.render('login', { message: 'Usuario registrado correctamente' });
        } else {
            logger.error(`El usuario ${username} no se ha podido registrar correctamente - ${method} [${time}]`);
            res.render('loginError', { message: 'El usuario no se ha podido registrar' });
        }
    })
})

user.delete("/:id", (req, res) => {
    let id = req.params.id;
    usuariosDao.deleteById(id)
    .then((user) => {
        res.json(user)
})
})

user.put("/:id", (req, res) => {
    let id = req.params.id;
    let { name, username, email, password, age, phone, address, image } = req.body;
    usuariosDao.changeById(id, { name, username, email, password, age, phone, address, image })
    .then((user) => {
        res.json(user)
})
})

export { user };