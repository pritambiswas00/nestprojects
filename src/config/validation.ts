import * as Joi from "joi";

export const configValidation = Joi.object({
    PORT : Joi.number().positive().default(5000)
})