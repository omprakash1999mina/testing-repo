import Joi from 'joi';

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    image: Joi.string().max(500),
});

export default updateUserSchema;