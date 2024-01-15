import axios from 'axios';
import { SERVER_URL } from '../../../../../routing/addressAPI';

export const addEditLogFieldConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/logs/log-fields`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
