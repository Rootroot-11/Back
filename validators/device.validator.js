const Joi = require('joi');

const createDeviceValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    price: Joi
        .number(),
    type: Joi
        .string()
        .alphanum()
        .trim(),
    brand: Joi
        .string(),
    statusOnMagazine: Joi
        .boolean(),
    email: Joi
        .string(),
});

module.exports = {createDeviceValidator};

