import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import winston from "winston";
import express from "express";
import session from "express-session";
import expressWinston from "express-winston";
import mongoose from "mongoose";
import passport from "passport";
import passportCustom from "passport-custom";
import { v4 as uuidv4 } from "uuid";
import MINIO from "./configs/minio";
import { logger } from "./configs/pino";
import REDIS_CLIENT from "./configs/redis";
import { MOMO_BASE_URL, MONGO_URL, SECRET } from "./configs/secrets";
import ApplicationRouter from "./controllers/index.router";
import assetCart from "./middlewares/assetCart";

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
    origin: [
      "http://localhost:3000",
      "http://localhost:4001",
      "http://conmeocam.ddns.net:4001",
      "http://192.168.1.8:4001",
      MOMO_BASE_URL,
    ],
    methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "DELETE", "HEAD"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.printf(
          (log: any) => `${log.level} ${log.message}`
        ),
      }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "[{{res.statusCode}}] [{{req.method}}] {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

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
