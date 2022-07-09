export const MEMORIES="Memories"

export const HTTP_METHOD={
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE"
}

export const API_URL={
POSTS:"http://localhost:5000/posts",
CREATE_POST:"http://localhost:5000/posts/create",
UPDATE_POST:"http://localhost:5000/posts/update/:id"
}

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