import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().required(),
    image: Joi.string().required(),
});

export default registerSchema;