const SET_ERROR = 'errors/SET_ERROR';

export default function reducer(state = null, action) {
    switch (action.type) {
        case SET_ERROR:
            return action.error;

        default:
            return state;
    }
}

export const setError = (statusCode, message) => ({
    type: SET_ERROR,
    error: statusCode || message ? {statusCode, message} : null,
});
