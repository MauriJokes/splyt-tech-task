var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
const timestamp = () => new Date().toISOString();
const formatMessage = (level, message, meta) => {
    const base = `[${timestamp()}] [${level}] ${message}`;
    if (meta) {
        return `${base} ${JSON.stringify(meta)}`;
    }
    return base;
};
export const logger = {
    info: (message, meta) => {
        console.log(formatMessage(LogLevel.INFO, message, meta));
    },
    warn: (message, meta) => {
        console.warn(formatMessage(LogLevel.WARN, message, meta));
    },
    error: (message, meta) => {
        console.error(formatMessage(LogLevel.ERROR, message, meta));
    },
    debug: (message, meta) => {
        if (process.env.NODE_ENV !== "production") {
            console.debug(formatMessage(LogLevel.DEBUG, message, meta));
        }
    },
};
//# sourceMappingURL=logger.js.map