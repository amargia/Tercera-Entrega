import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritoDaoFirebase from "./carrito/CarritoDaoFirebase.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritoDaoMemoria from "./carrito/CarritoDaoMemoria.js";
import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritoDaoArchivo from "./carrito/CarritoDaoArchivo.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritoDaoMongoDB from "./carrito/CarritoDaoMongoDB.js";
import UsuariosDaoMongoDB from "./usuarios/UsuariosDaoMongoDB.js";


import dotenv from "dotenv";
dotenv.config();

let productosDao;
let carritoDao;
let usuariosDao;

switch (process.env.PERS || 'mongodb') {
    case 'json':
        productosDao = new ProductosDaoArchivo();
        carritoDao = new CarritoDaoArchivo();
    break;
    case 'firebase':
        productosDao = new ProductosDaoFirebase();
        carritoDao = new CarritoDaoFirebase();
    break;
    case 'memoria':
        productosDao = new ProductosDaoMemoria();
        carritoDao = new CarritoDaoMemoria();
    break;
    case 'mongodb':
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        usuariosDao = new UsuariosDaoMongoDB();
    break;
}

export { productosDao, carritoDao, usuariosDao };