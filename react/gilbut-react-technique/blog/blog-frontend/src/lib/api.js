import axios from 'axios';

export const writePost = ({ title, body, tags }) => axios.post('/api/posts', { title, body, tags });
