const Joi = require('joi')

const schemaAddContact = Joi.object({
  _id: Joi.string().pattern(/^[a-f\d]{24}$/i),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .required(),
  subscription: Joi.string().valid('free', 'premium', 'pro').optional(),
  password: Joi.string().required(),
  token: Joi.any().optional(),
})

const schemaUpdateContact = Joi.object({
  _id: Joi.string().pattern(/^[a-f\d]{24}$/i),
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .optional(),
  subscription: Joi.string().valid('free', 'premium', 'pro').optional(),
  password: Joi.string().optional(),
  token: Joi.string().token().optional(),
}).min(1)

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    if (error.details[0].path[0] === 'phone') {
      return next({
        status: 400,
        message:
          "Field phone must be in one of the formats: '(XXX) XXX-XXX, XXX-XXX-XXXX, XXX XXX XXXX, XXX.XXX.XXXX, +XX (XXX) XXX-XXXX'",
      })
    } else if (error.details[0].type === 'object.min') {
      return next({
        status: 400,
        message: 'missing fields',
      })
    } else {
      return next({
        status: 400,
        message: `Field ${message.replace(/"/g, '')}`,
      })
    }
  }
  next()
}

module.exports.addContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
