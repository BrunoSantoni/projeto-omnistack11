import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', //Parte da URL que se mantém em todas as chamadas.
})

export default api;