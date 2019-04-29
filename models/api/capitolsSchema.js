const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createCapitolsSchema: Joi.object().keys({
    titol: Joi.string().required(),
    numero: Joi.number().required(),
    temporada: Joi.number().required(),
    serieId: Joi.number().required()
    }),

    getCapitolsListSchema: Joi.object().keys({
        skip: Joi.number().optional(),
        limit: Joi.number().optional()
    }).and('skip', 'limit'),

    getCapitolsDetailsSchema: Joi.object().keys({
        capitolsId: Joi.objectId().required()
    })
}
