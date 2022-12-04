import winston from "winston";

function buildProdLogger() {
    const prodLogger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: "logs/error.log",
                level: "error",
            }),
            new winston.transports.File({
                filename: "logs/warn.log",
                level: "warn",
            }),
        ]
    })
    return prodLogger;
}

function buildDevLogger() {
    const devLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "debug",
            }),
            new winston.transports.File({
                filename: "logs/error.log",
                level: "error",
            }),
            new winston.transports.File({
                filename: "logs/warn.log",
                level: "warn",
            }),
        ]
    })
    return devLogger;
}

let logger = null;

if (process.env.NODE_ENV === "production") {
    logger = buildProdLogger();
} else {
    logger = buildDevLogger();
}

export { logger };