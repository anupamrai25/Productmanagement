const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().optional(),
  quantity: Joi.number().integer().positive().required()
});

module.exports = {
  validateProduct: (data) => productSchema.validate(data, { abortEarly: false })
};
