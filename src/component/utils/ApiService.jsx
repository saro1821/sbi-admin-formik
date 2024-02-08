import axios from 'axios'
const API_URL='https://659cdfcf633f9aee79080f46.mockapi.io/'



const AxiosService=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})


export default AxiosService