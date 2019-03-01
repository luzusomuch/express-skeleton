import Joi from 'joi';

const createUserSchema = Joi.object().keys({
  email: Joi.string().email({minDomainAtoms: 2}),
  password: Joi.string()
});

exports.validateCreateUserSchema = function(data, callback) {
  Joi.validate(data, createUserSchema, function(err) {
    if (!err) {
      callback();
    } else {
      callback(err);
    }
  });
}