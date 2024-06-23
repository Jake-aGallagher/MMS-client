import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditUrgencyTypeConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/urgencytypes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
