import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const updateJobNotesConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/jobs/notes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
