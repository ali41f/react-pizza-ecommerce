import { SET_USER, CLEAR_USER, SET_MESSAGE } from './types';

export const setUser = user => {
    return {
        type: SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}

export const setMessage = msg => ({
    type: SET_MESSAGE,
    payload: msg
});