const constants = require('../config/constants');
const Capitols = require('../models/db/capitolsModel');
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

module.exports.createCapitols = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        /*const data = new Capitols({
            mail: serviceData.mail,
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone // es igual l'ordre, no cal que estigui igual que capitolsModel
        });*/
        const data = {
            model: new Capitols(serviceData)
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
            responseObj.status = constants.serviceStatus.CAPITOLS_CREATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-createCapitols: ', err);
    }
    return responseObj;
}

module.exports.getCapitolsList = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {},
            model: Capitols,
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
            responseObj.status = constants.serviceStatus.CAPITOLS_LIST_FETCHED_SUCCESSFULLY;
        }

    }catch(err) {
        console.log('ERROR-Service-getCapitolsList: ', err);
    }
    return responseObj;
}

module.exports.getCapitolsDetails = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.capitolsId)
            },
            model: Capitols,
            projection: {}
        };
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_FETCHED
        };*/
        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.CAPITOLS_FETCHED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-getCapitolsDetails: ', err);
    }
    return responseObj;
}

module.exports.updateCapitols = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.capitolsId)
            },
            model: Capitols,
            projection: {
                "__v": false
            },
            updateQuery: {}
        };
        if(serviceData.titol) data.updateQuery.titol = serviceData.titol;
        if(serviceData.numero) data.updateQuery.numero = serviceData.numero;
        if(serviceData.temporada) data.updateQuery.temporada = serviceData.temporada;

        //Call db command
        /*const responseFromDatabase = {
            status: constants.databaseStatus.ENTITY_UPDATED,
            result: 'okay'
        };*/
        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_UPDATED) {
            responseObj.body = responseFromDatabase.result;
            responseObj.status = constants.serviceStatus.CAPITOLS_UPDATED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-updateCapitols: ', err);
    }
    return responseObj;
}

module.exports.deleteCapitols = async (serviceData) => {
    const responseObj = constants.responseObj;
    try{
        const data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.capitolsId)
            },
            model: Capitols,
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
            responseObj.status = constants.serviceStatus.CAPITOLS_DELETED_SUCCESSFULLY;
        }
    }catch(err) {
        console.log('ERROR-Service-deleteCapitols: ', err);
    }
    return responseObj;
}
