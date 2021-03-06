const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createMediaSchema: Joi.object().keys({
    titol: Joi.string().required(),
    sinopsis: Joi.string().required(),
    puntuacio: Joi.number().required(),
    tipus: Joi.string().valid("pelicula", "serie").required()
    }),

    getMediaListSchema: Joi.object().keys({
        mediaTipus: Joi.string().required(),
        skip: Joi.number().optional(),
        limit: Joi.number().optional()
    }).and('skip', 'limit'),

    //getMediaDetailsSchema: Joi.object().keys({
      //  mediaId: Joi.objectId().required()
    //})

    mediaIdPathParamSchema: Joi.object().keys({
        mediaId: Joi.objectId().required()
    }),

    updateMediaBodySchema: Joi.object().keys({
        titol: Joi.string().optional(),
        sinopsis: Joi.string().optional(),
        puntuacio: Joi.number().optional()
    })
}
