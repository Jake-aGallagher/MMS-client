import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditJobTypeConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/jobtypes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
