const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createUserSchema: Joi.object().keys({
      mail: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      tipus: Joi.string().valid("admin", "normal").required(),
      direccio: Joi.string().required(),
      nCompte: Joi.number().required()
  }),

    getUserListSchema: Joi.object().keys({
        skip: Joi.number().optional(),
        limit: Joi.number().optional()
    }).and('skip', 'limit'),

    //getUserDetailsSchema: Joi.object().keys({
      //  userId: Joi.objectId().required()
    //})

    userIdPathParamSchema: Joi.object().keys({
        userId: Joi.objectId().required()
    }),

    updateUserBodySchema: Joi.object().keys({
        password: Joi.string().optional(),
        direccio: Joi.string().optional(),
        nCompte: Joi.number().optional()
    })
}
