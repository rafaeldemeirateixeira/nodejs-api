import { celebrate, Joi, Segments } from "celebrate";

export const authValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        grant_type: Joi.string().equal('password', 'biometric', 'qrcode').required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(8).required()
    })
}, {
    abortEarly: false
});
