const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston.format;

var transport = new winston.transports.DailyRotateFile({
  filename: "logs/log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

const format = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${process.env.NODE_ENV}  [${level}] ${message}`;
});

const logger = winston.createLogger({
  level: "http",
  format: combine( timestamp(), format),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/log-%DATE%.log",
      datePattern: "YYYY-MM-DD",
    }),
    new winston.transports.Console(),
  ],
});

const printLogger = (type, msg) => {
  if (type === "error") {
    logger.error(msg);
  } else {
    logger.info(msg);
  }
};

module.exports = printLogger;
