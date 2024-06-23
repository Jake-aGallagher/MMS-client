import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const addEditEnumGroupConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/enumgroups`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
