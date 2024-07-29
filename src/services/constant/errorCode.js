// define all fields error codes

export const ERROR = Object.freeze({
    ERROR: {
        WITHOUT_ERROR: 0,
        WITH_ERROR: 1
    },
    ERROR_CODE: {
        SUCCESS: 200,
        UNAUTHORIZED_USER: 401,
        EMAIL_NOT_EXIST: 101,
        INCORRECT_PASSWORD: 102,
        USER_NOT_EXIST: 103,
        EMAIL_EXIST: 104,
        PHONE_EXIST: 105,
        EMAIL_PHONE_EXIST: 106,
        LINK_EXPIRE: 110,
        LINK_ALREADY_USED: 111,
        DEACTIVATED_USER: 107,
        DUPLICATE_DEPT: 108,
        CLIENT_MAP_WITH_DEPT: 109,
        INTERNAL_SERVER_ERROR: 500,
        DUPLICATE_FEEDBACK: 117,
        PARAM_MISSING: 1001,
        EMAIL_MISSING: 1002,
        MOBILE_MISSING: 1003,
        EMAIL_EXISTS: 1004,
        PHONE_EXISTS: 1004,
        NAME_EXISTS: 1004,
        CUSTOM_ERROR: 1005,
    }
});