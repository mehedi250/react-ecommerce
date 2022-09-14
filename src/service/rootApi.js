import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

export const sendRequest =(data) =>{
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/register', data)
    });
}