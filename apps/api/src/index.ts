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

import passportCustom from "passport-custom";
const CustomStrategy = passportCustom.Strategy;

const RedisStore = connectRedis(session);
const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL);
MINIO.getBucketNotification("lej-marketplace");
app.use(cors({ origin: "*" }));

app.use(passport.initialize());

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

passport.use(
  "authtoken",
  new CustomStrategy(function (req, callback) {
    const isValid = req.body.token === SECRET;
    if (isValid) callback(new Error("Authentication Failed"));
    callback(null);
  })
);

app.use(ApplicationRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
