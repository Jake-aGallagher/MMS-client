import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditFieldConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/fields`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
