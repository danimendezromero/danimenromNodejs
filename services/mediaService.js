const constants = require('../config/constants');
const Media = require('../models/db/mediaModel');
const crudRepository = require('../database/crudRespository');
const mongoose = require('mongoose');



module.exports.createMedia = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        /*const data = new Media({
            mail: serviceData.mail,
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone // es igual l'ordre, no cal que estigui igual que mediaModel
        });*/
        const data = {
            model: new Media(serviceData)
        };
        //Call db command
        /*
        let responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_CREATED,
            result: 'okay'
        };
        */
        const responseFromDatabase = await crudRepository.insertData(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_CREATED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.MEDIA_CREATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-createMedia: ', err);
    }
    return responseObj;
}

module.exports.getMediaList = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {},
            model: Media,
            projection: {
                '__v': false,
                'password': false
            }
        };
        if(serviceData.skip && serviceData.limit) {
            data.skip = parseInt(serviceData.skip);
            data.limit = parseInt(serviceData.limit);
        }
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_FETCHED
        };*/
        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.MEDIA_LIST_FETCHED_SUCCESSFULLY;
        }

    }catch(err) {
        console.log('ERROR-Service-getMediaList: ', err);
    }
    return responseObj;
}

module.exports.getMediaDetails = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.mediaId)
            },
            model: Media,
            projection: {}
        };
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_FETCHED
        };*/
        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.MEDIA_FETCHED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-getMediaDetails: ', err);
    }
    return responseObj;
}
