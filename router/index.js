import express from "express";
const router = express.Router();


//routers
import { home } from "./homeRouter.js";
import { products } from "./productRouter.js";
import { productsList } from "./productsListRouter.js";
import { cart } from "./cartRouter.js";
import { login } from "./loginRouter.js";
import { loginError } from "./loginErrorRouter.js";
import { logout } from "./logoutRouter.js";
import { sessions } from "./sessionsRouter.js";
import { userInfo } from "./userInfoRouter.js";
import { user } from "./userRouter.js";

//middlewares
router.use("/", home)
router.use("/api/productos", products);
router.use("/lista-productos", productsList);
router.use("/api/carrito", cart);
router.use("/login", login);
router.use("/loginerror", loginError);
router.use("/logout", logout);
router.use("/sessions", sessions);
router.use("/user", userInfo);
router.use("/register", user);

export { router };