import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditEnumConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/enums`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
