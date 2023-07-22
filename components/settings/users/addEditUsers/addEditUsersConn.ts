import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditUsersConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/users`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
