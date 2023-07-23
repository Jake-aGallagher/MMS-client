import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const updateJobNotesConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/jobs/notes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
