import { EMAIL, NAMA, PASSWORD, PROFILE } from "../actionTypes";

interface initialStateItf{
    nama: string,
    email: string,
    password: string,
    profile: any,
}

const inisialState: initialStateItf = {
    nama: '',
    email: '',
    password: '',
    profile: null,
}

const EditProfileReducer = (
    state = inisialState,
    action: {type: string, payload: any}
) => {
    switch (action.type) {
        case NAMA:
            return { ...state, nama: action.payload }
        
        case EMAIL:
            return { ...state, email: action.payload }
        
        case PASSWORD:
            return { ...state, password: action.payload }
        
        case PROFILE:
            return { ...state, profile: action.payload }
    
        default:
            return state
    }
}

export default EditProfileReducer