// Definim unes quantes constants que ens serviran com a missatges d'error o succes.
module.exports = {
    responseObj: {
        status: 500,
        message: 'Internal server error',
        body: {}
    },
    databaseStatus: {
        ENTITY_CREATED: 'Entity Created',
        ENTITY_FETCHED: 'Entity Fetched',
        ENTITY_UPDATED: 'Entity Updated',
        ENTITY_DELETED: 'Entity Deleted',
        DATABASE_CONNECTED: 'Database connected successfully',
        DATABASE_ERROR: 'Database error',
    },
    controllerStatus: {
        BAD_REQUEST: 'Required fields missing'
    },
    serviceStatus: {
        MEDIA_CREATED_SUCCESSFULLY: 'MEDIA created successfully',
        MEDIA_LIST_FETCHED_SUCCESSFULLY: 'MEDIA list fetched successfully',
        MEDIA_FETCHED_SUCCESSFULLY: 'MEDIA Fetched Successfully',
        MEDIA_UPDATED_SUCCESSFULLY: 'MEDIA updated successfully',
        MEDIA_DELETED_SUCCESSFULLY: 'MEDIA deleted successfully',
        CAPITOLS_CREATED_SUCCESSFULLY: 'CAPITOLS created successfully',
        CAPITOLS_LIST_FETCHED_SUCCESSFULLY: 'CAPITOLS list fetched successfully',
        CAPITOLS_FETCHED_SUCCESSFULLY: 'CAPITOLS Fetched Successfully',
        CAPITOLS_UPDATED_SUCCESSFULLY: 'CAPITOLS updated successfully',
        CAPITOLS_DELETED_SUCCESSFULLY: 'CAPITOLS deleted successfully',
        USER_CREATED_SUCCESSFULLY: 'User created successfully',
        USER_LIST_FETCHED_SUCCESSFULLY: 'User list fetched successfully',
        USER_FETCHED_SUCCESSFULLY: 'User Fetched Successfully',
        USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
        USER_DELETED_SUCCESSFULLY: 'User deleted successfully',
        USER_AUTHENTICATED_SUCCESSFULLY: 'User authenticated successfully',
        INVALID_CREDENTIALS: 'name or password is incorrect'
    },
    requestObj: {
        BODY: 'body',
        QUERY_PARAMS: 'query',
        PATH_PARAMS: 'path'
    }
}
