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
import bodyParser from "body-parser";

import passportCustom from "passport-custom";
import { logRequest } from "./middlewares/logger";
import assetOrder from "./middlewares/assetOrder";
import { logger } from "./configs/pino";
const CustomStrategy = passportCustom.Strategy;

const RedisStore = connectRedis(session);
const app = express();
const port = 4000;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL);
MINIO.getBucketNotification("lej-marketplace");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
    exposedHeaders: ['set-cookie'],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(logRequest);

passport.use(
  "authtoken",
  new CustomStrategy((req, callback) => {
    const isValid = req.headers["token"] === SECRET;
    if (!isValid) callback(new Error("Authentication Failed"));
    callback(null, { active: true });
  })
);

passport.serializeUser(function (user, done) {
  done(null, {});
});

passport.deserializeUser(function (user, done) {
  done(null, {});
});

app.set("trust proxy", 1);

app.use(
  session({
    genid: () => uuidv4(),
    store: new RedisStore({ client: REDIS_CLIENT as any }),
    secret: SECRET,
    saveUninitialized: false,
    rolling: true,
    resave: true,
    unset: "destroy",
    cookie: { secure: false, maxAge: 60 * 60 * 24 * 30 * 1000 },
  })
);
app.use(passport.session());
app.use(assetOrder);

app.use(ApplicationRouter);

app.listen(port, () => logger.info(`Listening on http://localhost:${port}`));
