import axios from "axios";

export const sendRequest =(type, subUrl, data=[]) =>{
    if(type === 'post'){
        return axios.post(subUrl, data);
    }
    else if(type === 'get'){
        return axios.get(subUrl, data);
    }
}