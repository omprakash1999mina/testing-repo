import Joi from 'joi';

const messageSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
});

export default messageSchema;