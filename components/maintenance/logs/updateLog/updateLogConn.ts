import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const updateLogConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/logs/log`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
