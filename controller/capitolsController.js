const constants = require('../config/constants');
const capitolsService = require('../services/capitolsService');

module.exports.createCapitols = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = req.body;
        console.log("req.body: ", req.body);
        // call the service with this data
        /*let responseFromService = {
            status: constants.serviceStatus.Capitols_CREATED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await capitolsService.createCapitols(data);
        if (responseFromService.status === constants.serviceStatus.CAPITOLS_CREATED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.CAPITOLS_CREATED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-createCapitols: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.getCapitolsList = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            skip: req.query.skip,
            limit: req.query.limit
        };
        /*const responseFromService = {
            status: constants.serviceStatus.CAPITOLS_LIST_FETCHED_SUCCESSFULLY
        };*/
        const responseFromService = await capitolsService.getCapitolsList(data);
        if (responseFromService.status === constants.serviceStatus.CAPITOLS_LIST_FETCHED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.CAPITOLS_LIST_FETCHED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-getCapitolsList: ', err)
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.getCapitolsDetails = async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            capitolsId: req.params.capitolsId,
        }
        /*const responseFromService = {
            status: constants.serviceStatus.CAPITOLS_FETCHED_SUCCESSFULLY
        };*/
        const responseFromService = await capitolsService.getCapitolsDetails(data);
        if (responseFromService.status === constants.serviceStatus.CAPITOLS_FETCHED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.CAPITOLS_FETCHED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-getCapitolsDetails: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.updateCapitols =  async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = req.body;
        data.capitolsId = req.params.capitolsId;
        // call the service with this data
        /*const responseFromService = {
            status: constants.serviceStatus.CAPITOLS_UPDATED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await capitolsService.updateCapitols(data);
        if (responseFromService.status === constants.serviceStatus.CAPITOLS_UPDATED_SUCCESSFULLY) {
            responseObj.status = 200;
            responseObj.message = constants.serviceStatus.CAPITOLS_UPDATED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-updateCapitols: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.deleteCapitols =  async (req, res, next) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            capitolsId: req.params.capitolsId
        };
        // call the service with this data
        /*const responseFromService = {
            status: constants.serviceStatus.CAPITOLS_DELETED_SUCCESSFULLY,
            message: 'okay',
            body: 'body'
        };*/
        const responseFromService = await capitolsService.deleteCapitols(data);
        if (responseFromService.status === constants.serviceStatus.CAPITOLS_DELETED_SUCCESSFULLY) {
            responseObj.status = 204;
            responseObj.message = constants.serviceStatus.CAPITOLS_DELETED_SUCCESSFULLY;
            responseObj.body = responseFromService.body;
        }
    } catch(err) {
        console.log('ERROR-Controller-deleteCapitols: ', err);
    }
    return res.status(responseObj.status).send(responseObj);
}
