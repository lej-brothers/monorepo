import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passportCustom from "passport-custom";
import { v4 as uuidv4 } from "uuid";
import MINIO from "./configs/minio";
import { logger } from "./configs/pino";
import REDIS_CLIENT from "./configs/redis";
import { MONGO_URL, SECRET } from "./configs/secrets";
import ApplicationRouter from "./controllers/index.router";
import assetCart from "./middlewares/assetCart";
import { logRequest } from "./middlewares/logger";
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
app.use(assetCart);

app.use(ApplicationRouter);

app.listen(port, () => logger.info(`Listening on http://localhost:${port}`));
