import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const editPMConn = async (data: FormData) => {
    return await axios.put(`${SERVER_URL}/schedules/edit`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
