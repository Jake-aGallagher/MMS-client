import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const addEditPropertyConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/properties`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
