const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');
const constants = require('../config/constants');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const mediaSchema = require('../models/api/mediaSchema');
const tokenValidation = require('../models/api/tokenValidation');

router.post('/',
joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
tokenValidation.validateToken(),
tokenValidation.checkUserAdmin(),
joiSchemaValidation.validate(mediaSchema.createMediaSchema, constants.requestObj.BODY),
mediaController.createMedia);

router.get('/list/:mediaTipus',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(mediaSchema.getMediaListSchema, constants.requestObj.PATH_PARAMS),
  mediaController.getMediaList);
router.get('/details/:mediaId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  mediaController.getMediaDetails
);

router.put('/:mediaId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  joiSchemaValidation.validate(mediaSchema.updateMediaBodySchema, constants.requestObj.BODY),
  mediaController.updateMedia
);
router.delete('/:mediaId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(mediaSchema.mediaIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  mediaController.deleteMedia
);

module.exports = router;
