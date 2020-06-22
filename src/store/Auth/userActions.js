import * as actionTypes from './types';

export const setUser = user => {
    console.log(actionTypes.SET_USER)
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}
