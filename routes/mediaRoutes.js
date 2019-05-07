const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');
const constants = require('../config/constants');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const mediaSchema = require('../models/api/mediaSchema');

router.post('/', joiSchemaValidation.validate(mediaSchema.createMediaSchema, constants.requestObj.BODY), mediaController.createMedia);

router.get('/list/:mediaTipus', joiSchemaValidation.validate(mediaSchema.getMediaListSchema, constants.requestObj.PATH_PARAMS), mediaController.getMediaList);
router.get('/details/:mediaId',
    joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    mediaController.getMediaDetails
);

router.put('/:mediaId',
    joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    joiSchemaValidation.validate(mediaSchema.updateMediaBodySchema, constants.requestObj.BODY),
    mediaController.updateMedia
);
router.delete('/:mediaId',
    joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    mediaController.deleteMedia
);

module.exports = router;
