const Joi = require('joi')
const constants = require('../config/constants')
let responseObj = {}

module.exports.validate = (schema, validation) => {
    // Ha de retornar una funció middleware, per tant té req, res, next.
    return (req, res, next) => {
        let objToValidate = {};
        if (validation === constants.requestObj.BODY) objToValidate = req.body;
        else if (validation === constants.requestObj.QUERY_PARAMS) objToValidate = req.query;
        else if (validation === constants.requestObj.PATH_PARAMS) objToValidate = req.params;
        const result = Joi.validate(objToValidate, schema);
        if(result.error) {
            //const errorDetail = result.error.details;
            const errorDetail = result.error.details.map((value) => {
                return value.message;
            });
            responseObj.status = 400;
            responseObj.message = constants.controllerStatus.BAD_REQUEST;
            responseObj.body = errorDetail;
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    }
}

module.exports.validateAuthHeader = (schema) => {
    // Ha de retornar una funció middleware, per tant té req, res, next.
    return (req, res, next) => {
        //console.log('req.header:',req.headers.authorization);
        const objToValidate = { authorization: req.headers.authorization};
        const result = Joi.validate(objToValidate, schema);
        if(result.error) {
            //const errorDetail = result.error.details;
            const errorDetail = result.error.details.map((value) => {
                return value.message;
            });
            responseObj.status = 403;
            responseObj.message = constants.controllerStatus.TOKEN_MISSING;
            responseObj.body = errorDetail;
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    }
}
