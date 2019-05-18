const express = require('express');
const router = express.Router();
const capitolsController = require('../controller/capitolsController');
const constants = require('../config/constants');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const capitolsSchema = require('../models/api/capitolsSchema');
const tokenValidation = require('../models/api/tokenValidation');

router.post('/',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(capitolsSchema.createCapitolsSchema, constants.requestObj.BODY),
  capitolsController.createCapitols);

router.get('/list',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(capitolsSchema.getCapitolsListSchema, constants.requestObj.QUERY_PARAMS),
  capitolsController.getCapitolsList);

router.get('/details/:capitolsId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(capitolsSchema.capitolsIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  capitolsController.getCapitolsDetails
);

router.put('/:capitolsId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(capitolsSchema.capitolsIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  joiSchemaValidation.validate(capitolsSchema.updateCapitolsBodySchema, constants.requestObj.BODY),
  capitolsController.updateCapitols
);
router.delete('/:capitolsId',
  joiSchemaValidation.validateAuthHeader(userSchema.tokenHeaderSchema),
  tokenValidation.validateToken(),
  tokenValidation.checkUserAdmin(),
  joiSchemaValidation.validate(capitolsSchema.capitolsIdPathParamSchema, constants.requestObj.PATH_PARAMS),
  capitolsController.deleteCapitols
);

module.exports = router;
