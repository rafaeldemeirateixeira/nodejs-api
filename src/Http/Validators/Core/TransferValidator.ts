import { celebrate, Joi, Segments } from "celebrate";

export const createTransfer = celebrate({
    [Segments.BODY]: Joi.object().keys({
        document: Joi.string().required().min(11).max(14),
        amount: Joi.number().min(1).required()
    })
}, {
    abortEarly: false
});

export const getAllTransfer = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().min(1),
        size: Joi.number().min(1)
    })
});
