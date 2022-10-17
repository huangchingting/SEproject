const winston = require('winston');

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        store: 4,
        debug: 5,
    },
    colors: {
        error: 'red',
        warn: 'yellowBG',
        info: 'blue',
        http: 'magenta',
        store: 'cyan',
        debug: 'grey',
    },
}

winston.addColors(logLevels.colors)

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize({
            all: true,
        }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.splat(),
        winston.format.simple(),
        winston.format.printf(
            (info) => `[${info.timestamp}] [${info.level}] ${info.message}`
        )
    ),
    levels: logLevels.levels,
    level: "debug",
    transports: [
        new winston.transports.Console({ handleExceptions: true })
    ],
    exitOnError: false,
})

// handling Uncaught Promise Rejections
logger.rejections.handle(new winston.transports.Console())

module.exports = {
    error(message, ...vars) {
        logger.error(message, vars)
    },
    warn(message, ...vars) {
        logger.warn(message, vars)
    },
    info(message, ...vars) {
        logger.info(message, vars)
    },
    http(message, ...vars) {
        logger.http(message, vars)
    },
    store(message, ...vars) {
        logger.store(message, vars)
    },
    debug(message, ...vars) {
        logger.debug(message, vars)
    },
}