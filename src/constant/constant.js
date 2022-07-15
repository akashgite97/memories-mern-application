export const MEMORIES="Memories"

export const HTTP_METHOD={
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE",
    PATCH:"PATCH"
}

export const API_URL= "http://localhost:5000/posts"


export const getActionType=(actionKey)=>{
    return{
        FETCHING:`${actionKey}_fetching`,
        FULFILLED:`${actionKey}_fullfilled`,
        REJECTED:`${actionKey}_rejected`
    }
}

export const errorMessages={
    error:"Something went wrong!",
}