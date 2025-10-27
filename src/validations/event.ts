import Joi from "joi";

export const eventSchema = Joi.object({
    event: Joi.object({
        name: Joi.string().required(),
        time: Joi.string().isoDate().required(),
    }).required(),

    data: Joi.object({
        driver_id: Joi.string().required(),
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        timestamp: Joi.string().isoDate().required(),
    }).required(),
});
