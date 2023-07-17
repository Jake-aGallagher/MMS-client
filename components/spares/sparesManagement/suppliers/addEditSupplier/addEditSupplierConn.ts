import axios from 'axios';
import { SERVER_URL } from '../../../../routing/addressAPI';

export const addEditSupplierConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/spares/supplier`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
