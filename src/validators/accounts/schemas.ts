import Joi from 'joi';

const createCheckingAccountSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().min(3).max(15).required(),
    isMain: Joi.boolean().required(),
});

export { createCheckingAccountSchema };
