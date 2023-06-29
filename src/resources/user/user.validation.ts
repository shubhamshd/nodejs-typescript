import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default { register, login };
