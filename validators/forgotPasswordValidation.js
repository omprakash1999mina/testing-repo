import Joi from 'joi';

const forgotPasswordSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.number().required(),
    password: Joi.string().min(8).max(50).required()
});

export default forgotPasswordSchema;
