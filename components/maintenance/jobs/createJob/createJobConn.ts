import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const createJobConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/maintenance/jobs`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
