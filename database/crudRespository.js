const mongoose = require('mongoose');
const constants = require('../config/constants');

module.exports.createConnection = () => {
    // Retornem una promesa per poder esperar al resultat, ja que les peticions a la bbdd són asíncrones.
    return new Promise((resolve, reject) => {
        const responseObj = {};
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err) => {
            if(err) {
                responseObj.status = constants.databaseStatus.DATABASE_ERROR;
                console.log("responseObj", responseObj);
                return reject(responseObj);
            } else {
                responseObj.status = constants.databaseStatus.DATABASE_CONNECTED;
                console.log("responseObj", responseObj);
                return resolve(responseObj);
            }
        })
    })
};

module.exports.insertData = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.save().then(docs => {
                //success
                const responseObj = {
                    result: docs,
                    status: constants.databaseStatus.ENTITY_CREATED
                }
                resolve(responseObj);
            }).catch(err => {
                //error
                const responseObj = {
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                };
                reject(responseObj);
            })
        }catch(err) {
            console.log('ERROR-CrudRepository-insertData: ', err);
        }
    });
};

module.exports.find = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.find(data.query, data.projection).skip(data.skip).limit(data.limit).then(docs => {
                //success
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_FETCHED
                })
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                })
            })
        }catch(err) {
            console.log('ERROR-CrudRepository-find: ', err)
        }
    })
}

module.exports.findOneAndUpdate = (data) => {
    return new Promise((resolve, reject) => {
        try {
            //new->true, perquè retorni el doc modificat en comptes de l'original
            //projection per dir si volem excloure algun camp.
            data.model.findOneAndUpdate(data.findQuery, data.updateQuery, { projection: data.projection, new: true }).then(docs => {
                //success
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_UPDATED
                })
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                })
            })
        }catch(err) {
            console.log('ERROR-CrudRepository-findOneAndUpdate: ', err)
        }
    })
}

module.exports.findOneAndDelete = (data) => {
    return new Promise((resolve, reject) => {
        try {
            //projection per dir si volem excloure algun camp.
            data.model.findOneAndDelete(data.query, { projection: data.projection }).then(docs => {
                //success
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_DELETED
                })
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                })
            })
        }catch(err) {
            console.log('ERROR-CrudRepository-findOneAndDelete: ', err)
        }
    })
}
