import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const addEditSupplierConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/supplier`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
