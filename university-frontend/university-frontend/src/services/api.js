import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Spring Boot Backend URL (Docker host port)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
