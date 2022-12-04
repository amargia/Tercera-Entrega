import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

import MongoStore from "connect-mongo";
const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cookieParser());

app.use(
  session({
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
      mongoOptions: advancedOptions
    }),
    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 6000000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

import { router } from "./router/index.js"

app.set('views', './views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", router);


const port = process.env.PORT || 8080

const server = app.listen(port, () => {
  console.log(`Server up on port ${server.address().port}`);
})

server.on("Error", (error) => `${error}`);