import { SET_USER, CLEAR_USER } from './types'

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialUserState, action) => {

    switch (action.type) {

        case SET_USER:
            console.log(action.payload.currentUser)
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state
    }
}


export default userReducer