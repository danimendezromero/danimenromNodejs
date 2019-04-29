const constants = require('../config/constants');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRespository');
const mongoose = require('mongoose');



module.exports.createUser = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        /*const data = new User({
            mail: serviceData.mail,
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone // es igual l'ordre, no cal que estigui igual que userModel
        });*/
        const data = {
            model: new User(serviceData)
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
            responseObj.status = constants.serviceStatus.USER_CREATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-createUser: ', err);
    }
    return responseObj;
}

module.exports.getUserList = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {},
            model: User,
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
            responseObj.status = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
        }

    }catch(err) {
        console.log('ERROR-Service-getUserList: ', err);
    }
    return responseObj;
}

module.exports.getUserDetails = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            projection: {}
        };
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_FETCHED
        };*/
        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.USER_FETCHED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-getUserDetails: ', err);
    }
    return responseObj;
}
