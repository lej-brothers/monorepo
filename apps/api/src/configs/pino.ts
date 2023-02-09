import pino from "pino";
import pretty from "pino-pretty";

export const logger = pino(
  pretty({
    translateTime: true,
    hideObject: true,
    colorize: true,
  })
);
