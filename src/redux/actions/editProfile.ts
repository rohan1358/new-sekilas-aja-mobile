import { EMAIL, NAMA, PASSWORD, PROFILE } from "../actionTypes/editProfile";

export const saveNama = (value: string) => ({
    type: NAMA,
    payload: value,
});
export const saveEmail = (value: string) => ({
    type: EMAIL,
    payload: value,
});
export const savePassword = (value: string) => ({
    type: PASSWORD,
    payload: value,
});
export const setProfileRedux = (value: any) => ({
    type: PROFILE,
    payload: value,
});