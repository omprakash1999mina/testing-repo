import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
// password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$@')).required(),

export default loginSchema;