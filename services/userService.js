const constants = require('../config/constants');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRespository');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

module.exports.updateUser = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            projection: {
                "__v": false
            },
            updateQuery: {}
        };
        if(serviceData.name) data.updateQuery.name = serviceData.name;
        if(serviceData.password) data.updateQuery.password = serviceData.password;
        if(serviceData.nCompte) data.updateQuery.nCompte = serviceData.nCompte;

        //Call db command
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_UPDATED,
            result: 'okay'
        };*/
        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_UPDATED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-updateUser: ', err);
    }
    return responseObj;
}

module.exports.deleteUser = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
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
            responseObj.status = constants.serviceStatus.USER_DELETED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-deleteUser: ', err);
    }
    return responseObj;
}

module.exports.authenticateUser = async (serviceData) => {
    const responseObj = constants.responseObj;
    try {
        const data = {
            query: {
                mail: serviceData.mail,
                password: serviceData.password
            },
            model: User
        };
        const responseFromDatabase = await crudRepository.find(data);
        if(responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED && responseFromDatabase.result.length > 0) {
            const token = jwt.sign(
                {
                    userId: responseFromDatabase.result[0]._id,
                    userType: 'admin'
                },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
            responseObj.status = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY;
            responseObj.body = {
                token: token
            };
        } else {
            responseObj.status = constants.serviceStatus.INVALID_CREDENTIALS;
        }
    } catch(err) {
        console.log('Something went wrong: Service: authenticate user:', err);
    }
    return responseObj;
}
