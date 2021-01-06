import { celebrate, Joi, Segments } from "celebrate";

export const userValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        tax_number: Joi.string().required(),
        account: Joi.string().equal('personal', 'company').required(),
        name: Joi.string().required().max(255),
        email: Joi.string().email().required(),
        password: Joi.string().max(8).required()
    })
}, {
    abortEarly: false
});
