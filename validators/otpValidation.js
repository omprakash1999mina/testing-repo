import Joi from 'joi';

const otpSchema = Joi.object({
    email: Joi.string().email().required(),
});

export default otpSchema;