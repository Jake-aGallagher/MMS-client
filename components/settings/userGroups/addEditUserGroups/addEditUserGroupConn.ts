import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const addEditUserGroupConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/usergroups`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
