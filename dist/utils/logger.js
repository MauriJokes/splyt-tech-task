var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function timestamp() {
    return new Date().toISOString();
}
function formatMessage(level, message, meta) {
    const base = `[${timestamp()}] [${level}] ${message}`;
    if (meta) {
        return `${base} ${JSON.stringify(meta)}`;
    }
    return base;
}
export const logger = {
    info: function (message, meta) {
        console.log(formatMessage(LogLevel.INFO, message, meta));
    },
    warn: function (message, meta) {
        console.warn(formatMessage(LogLevel.WARN, message, meta));
    },
    error: function (message, meta) {
        console.error(formatMessage(LogLevel.ERROR, message, meta));
    },
    debug: function (message, meta) {
        if (process.env.NODE_ENV !== "production") {
            console.debug(formatMessage(LogLevel.DEBUG, message, meta));
        }
    },
};
//# sourceMappingURL=logger.js.map