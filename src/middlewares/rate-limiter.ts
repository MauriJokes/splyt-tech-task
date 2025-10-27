import rateLimit from "express-rate-limit";

const eventLimiter = rateLimit({
    windowMs: 10 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
});

export default eventLimiter;
