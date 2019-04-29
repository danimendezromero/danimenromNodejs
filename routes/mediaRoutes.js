const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');
const constants = require('../config/constants');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const mediaSchema = require('../models/api/mediaSchema');

router.post('/', joiSchemaValidation.validate(mediaSchema.createMediaSchema, constants.requestObj.BODY), mediaController.createMedia);

router.get('/list', joiSchemaValidation.validate(mediaSchema.getMediaListSchema, constants.requestObj.QUERY_PARAMS), mediaController.getMediaList);
router.get('/details/:mediaId', joiSchemaValidation.validate(mediaSchema.getMediaDetailsSchema, constants.requestObj.PATH_PARAMS), mediaController.getMediaDetails);

module.exports = router;
