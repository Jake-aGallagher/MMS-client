import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const updateJobFullConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/jobs/update`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
