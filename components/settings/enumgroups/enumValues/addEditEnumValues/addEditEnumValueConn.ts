import axios from 'axios';
import { SERVER_URL } from '../../../../routing/addressAPI';

export const addEditEnumValueConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/enumvalues`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
