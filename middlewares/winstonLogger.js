const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston.format;

var transport = new winston.transports.DailyRotateFile({
  filename: "logs/log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

const format = printf(({ level, message, timestamp }) => {
  return `${timestamp}  [${level}] ${message}`;
});

const logger = winston.createLogger({
  level: "http",
  format: combine(timestamp(), format),
  transports: [transport],
});

const printLogger = (res,type, msg) => {
  if (type === "error") {
    logger.error(
      `${res.method} ${res.originalUrl} ${msg}`
    );
  } else {
    logger.info(
      `${res.method} ${res.originalUrl} ${msg}`
    );
  }
};

module.exports = printLogger;
