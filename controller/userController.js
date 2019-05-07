const constants = require('../config/constants');
const userService = require('../services/userService');

module.exports.createUser = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = req.body;
        console.log("req.body: ", req.body);
        // call the service with this data
        /*let responseFromService = {
            status: constants.serviceStatus.USER_CREATED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await userService.createUser(data);
        if (responseFromService.status === constants.serviceStatus.USER_CREATED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.USER_CREATED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-createUser: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.getUserList = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            skip: req.query.skip,
            limit: req.query.limit
        };
        /*const responseFromService = {
            status: constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY
        };*/
        const responseFromService = await userService.getUserList(data);
        if (responseFromService.status === constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-getUserList: ', err)
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.getUserDetails = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            userId: req.params.userId,
        }
        /*const responseFromService = {
            status: constants.serviceStatus.USER_FETCHED_SUCCESSFULLY
        };*/
        const responseFromService = await userService.getUserDetails(data);
        if (responseFromService.status === constants.serviceStatus.USER_FETCHED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.USER_FETCHED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-getUserDetails: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.updateUser =  async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = req.body;
        data.userId = req.params.userId;
        // call the service with this data
        /*const responseFromService = {
            status: constants.serviceStatus.USER_UPDATED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await userService.updateUser(data);
        if (responseFromService.status === constants.serviceStatus.USER_UPDATED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-updateUser: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.deleteUser =  async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            userId: req.params.userId
        };
        // call the service with this data
        /*const responseFromService = {
            status: constants.serviceStatus.USER_DELETED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await userService.deleteUser(data);
        if (responseFromService.status === constants.serviceStatus.USER_DELETED_SUCCESSFULLY) {
            responseObj.status = 204;
            responseObj.message = constants.serviceStatus.USER_DELETED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-deleteUser: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}
