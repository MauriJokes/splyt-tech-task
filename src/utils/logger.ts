enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

function timestamp() {
    return new Date().toISOString();
}

function formatMessage(level: LogLevel, message: string, meta?: any) {
    const base = `[${timestamp()}] [${level}] ${message}`;
    if (meta) {
        return `${base} ${JSON.stringify(meta)}`;
    }
    return base;
}

export const logger = {
    info: function (message: string, meta?: any) {
        console.log(formatMessage(LogLevel.INFO, message, meta));
    },

    warn: function (message: string, meta?: any) {
        console.warn(formatMessage(LogLevel.WARN, message, meta));
    },

    error: function (message: string, meta?: any) {
        console.error(formatMessage(LogLevel.ERROR, message, meta));
    },

    debug: function (message: string, meta?: any) {
        if (process.env.NODE_ENV !== "production") {
            console.debug(formatMessage(LogLevel.DEBUG, message, meta));
        }
    },
};
