import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditTaskTypeConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/tasktypes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
