// Definim unes quantes constants que ens serviran com a missatges d'error o succes.
module.exports = {
    responseObj: {
        status: 500,
        message: 'Internal server error',
        body: {}
    },
    databaseStatus: {
        ENTITY_CREATED: 'Entity Created',
        DATABASE_CONNECTED: 'Database connected successfully',
        DATABASE_ERROR: 'Database error',
        ENTITY_FETCHED: 'Entity Fetched'
    },
    controllerStatus: {
        BAD_REQUEST: 'Required fields missing'
    },
    serviceStatus: {
        USER_CREATED_SUCCESSFULLY: 'User created successfully',
        MEDIA_CREATED_SUCCESSFULLY: 'Media created successfully',
        CAPITOLS_CREATED_SUCCESSFULLY: 'Capitols created successfully'
    },
    requestObj: {
        BODY: 'body',
        QUERY_PARAMS: 'query',
        PATH_PARAMS: 'path'
    }
}
