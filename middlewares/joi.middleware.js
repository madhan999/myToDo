const Joi = require('joi');

const signUpSchema = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    }
)

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const createTaskSchema = Joi.object({
    description: Joi.string().optional(),
    name: Joi.string().required(),
    priority: Joi.string().allow("low", "medium", "high"),
    dueDate: Joi.string().required(),
    status: Joi.string().allow("pending", "inProgress", "completed", "overdue")
})
const updateTaskSchema = Joi.object({
    description: Joi.string().optional(),
    name: Joi.string().required(),
    priority: Joi.string().allow("low", "medium", "high"),
    dueDate: Joi.string().required(),
    status: Joi.string().allow("pending", "inProgress", "completed", "overdue")
})

const validateSchema = (schema, key) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body[key]);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
}

module.exports = {
    validateSchema,
    signUpSchema,
    loginSchema,
    createTaskSchema,
    updateTaskSchema
}
