import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { MONGO_URL, SECRET } from "./configs/secrets";
import REDIS_CLIENT from "./configs/redis";
import MINIO from "./configs/minio";

import mongoose from "mongoose";
import passport from "passport";
import ApplicationRouter from "./controllers/index.router";
import bodyParser from 'body-parser'

import passportCustom from "passport-custom";
import { logRequest } from './middlewares/logger';
const CustomStrategy = passportCustom.Strategy;

const RedisStore = connectRedis(session);
const app = express();
const port = 4000;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL);
MINIO.getBucketNotification("lej-marketplace");
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({ origin: "*" }));

app.use(passport.initialize());
app.use(logRequest)

passport.use(
  "authtoken",
  new CustomStrategy((req, callback) => {
    const isValid = req.headers['token'] === SECRET;
    if (!isValid) callback(new Error("Authentication Failed"));
    callback(null, { active: true });
  })
);

passport.serializeUser(function(user, done) {
  done(null, {});
});

passport.deserializeUser(function(user, done) {
  done(null, {});
});

app.use(
  session({
    genid: () => uuidv4(),
    store: new RedisStore({ client: REDIS_CLIENT as any }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.session());


app.use(ApplicationRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
