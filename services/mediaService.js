const constants = require('../config/constants');
const Media = require('../models/db/mediaModel');
const crudRepository = require('../database/crudRespository');
const mongoose = require('mongoose');

module.exports.createConnection = async () => {
    try{
        const responseFromDatabase = await crudRepository.createConnection();
        console.log("responseObj", responseFromDatabase);
    }catch(err) {
        console.log('ERROR-Service-createConnection: ', err);
    }
};

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
            query: {
              tipus: serviceData.mediaTipus
            },
            model: Media,
            projection: {
              '__v': false
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

module.exports.updateMedia = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.mediaId)
            },
            model: Media,
            projection: {
                "__v": false
            },
            updateQuery: {}
        };
        if(serviceData.titol) data.updateQuery.titol = serviceData.titol;
        if(serviceData.sinopsis) data.updateQuery.sinopsis = serviceData.sinopsis;
        if(serviceData.puntuacio) data.updateQuery.puntuacio = serviceData.puntuacio;

        //Call db command
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_UPDATED,
            result: 'okay'
        };*/
        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_UPDATED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.MEDIA_UPDATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-updateMedia: ', err);
    }
    return responseObj;
}

module.exports.deleteMedia = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.mediaId)
            },
            model: Media,
            projection: {
                "__v": false
            }
        };
        //Call db command
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_DELETED,
            result: 'okay'
        };*/
        const responseFromDatabase = await crudRepository.findOneAndDelete(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_DELETED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.MEDIA_DELETED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-deleteMedia: ', err);
    }
    return responseObj;
}
