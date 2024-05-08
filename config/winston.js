const { createLogger, format, transports } =require('winston');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    console.log();
    return `${timestamp} ${process.env.NODE_ENV} [${level}]: ${message}`; // LOG FORMAT
});

const devLogger = () => {
    return createLogger({
        level: 'debug',
        format: combine(
            format.colorize(),
            label({ label: 'dev' }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new transports.Console() // ONLY PRINTING LOGS IN TERMINAL
        ]
    });
};   

module.exports=  devLogger;
