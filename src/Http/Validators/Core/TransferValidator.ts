import { celebrate, Joi, Segments } from "celebrate";

export const transferValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        document: Joi.string().required().min(11).max(14),
        amount: Joi.number().min(1).required()
    })
}, {
    abortEarly: false
});
