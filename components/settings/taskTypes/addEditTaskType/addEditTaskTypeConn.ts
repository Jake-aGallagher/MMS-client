import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const addEditTaskTypeConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/tasktypes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
