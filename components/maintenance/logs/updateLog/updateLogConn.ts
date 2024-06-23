import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const updateLogConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/logs/log`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
