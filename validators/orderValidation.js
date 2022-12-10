import Joi from 'joi';

const orderSchema = Joi.object({
    name : Joi.string().required(),
    items: Joi.object().required(),
    phone: Joi.string().required(),
    totalgrand: Joi.number().required(),
    address: Joi.string().required(),
    paymentType: Joi.string(),
    status: Joi.string()
});

export default orderSchema;