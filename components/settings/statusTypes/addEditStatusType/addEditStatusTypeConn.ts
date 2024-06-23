import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditStatusTypeConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/statustypes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
