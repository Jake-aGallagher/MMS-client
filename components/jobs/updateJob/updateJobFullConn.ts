import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const updateJobFullConn = async (data: FormData) => {
    return await axios.put(`${SERVER_URL}/jobs/notes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
