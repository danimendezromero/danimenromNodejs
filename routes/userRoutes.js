const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const constants = require('../config/constants');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const userSchema = require('../models/api/userSchema');


router.post('/',
    joiSchemaValidation.validate(userSchema.createUserSchema, constants.requestObj.BODY), userController.createUser
);

router.get('/list',
    joiSchemaValidation.validate(userSchema.getUserListSchema, constants.requestObj.QUERY_PARAMS),
    userController.getUserList
);
router.get('/details/:userId',
    joiSchemaValidation.validate(userSchema.userIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    userController.getUserDetails
);

router.put('/:userId',
    joiSchemaValidation.validate(userSchema.userIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    joiSchemaValidation.validate(userSchema.updateUserBodySchema, constants.requestObj.BODY),
    userController.updateUser
);
router.delete('/:userId',
    joiSchemaValidation.validate(userSchema.userIdPathParamSchema, constants.requestObj.PATH_PARAMS),
    userController.deleteUser
);

module.exports = router;
