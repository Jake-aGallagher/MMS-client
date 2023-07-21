import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditUserGroupConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/usergroup`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
