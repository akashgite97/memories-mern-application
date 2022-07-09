import { UPDATE_FORM_STATE, RESET_STATE } from "../action-type-constant";

export const updateFormState=(name,value)=>({
    type:UPDATE_FORM_STATE,
    payload:{
        fieldName:name,
        fieldValue:value
    }
})

export const resetFormState=()=>({
 type:RESET_STATE,
 payload:{}
})