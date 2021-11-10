import { EMAIL, NAMA, PASSWORD } from "../actionTypes";

interface initialStateItf{
    nama: string,
    email: string,
    password: string,
}

const inisialState: initialStateItf = {
    nama: 'Ahmad Siddiq',
    email: '',
    password: '',
}

const EditProfileReducer = (
    state = inisialState,
    action: {type: string, payload: string}
) => {
    switch (action.type) {
        case NAMA:
            return { ...state, nama: action.payload }
        
        case EMAIL:
            return { ...state, email: action.payload }
        
        case PASSWORD:
            return { ...state, password: action.payload }
    
        default:
            return state
    }
}

export default EditProfileReducer