import { CHANGE_LANGUAGE } from "../action-type-constant";

export const changeLanguage=(language)=>{
    return{
        type:CHANGE_LANGUAGE,
        payload:language
    }
}