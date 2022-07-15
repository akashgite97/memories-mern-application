import axios from 'axios'

export default axios.create({
    baseURL:"http://localhost:5000/posts",
    headers:{
        "Content-type": "application/json"
    }
})