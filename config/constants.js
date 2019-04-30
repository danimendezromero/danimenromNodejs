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
        USER_LIST_FETCHED_SUCCESSFULLY: 'User list fetched successfully',
        USER_FETCHED_SUCCESSFULLY: 'User Fetched Successfully',
        MEDIA_CREATED_SUCCESSFULLY: 'Media created successfully',
        MEDIA_LIST_FETCHED_SUCCESSFULLY: 'Media list fetched successfully',
        MEDIA_FETCHED_SUCCESSFULLY: 'Media Fetched Successfully',
        CAPITOLS_CREATED_SUCCESSFULLY: 'Capitols created successfully',
        CAPITOLS_LIST_FETCHED_SUCCESSFULLY: 'Capitols list fetched successfully',
        CAPITOLS_FETCHED_SUCCESSFULLY: 'Capitols Fetched Successfully'
    },
    requestObj: {
        BODY: 'body',
        QUERY_PARAMS: 'query',
        PATH_PARAMS: 'path'
    }
}
