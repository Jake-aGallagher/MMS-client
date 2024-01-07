import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const addScheduleConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/schedule-templates`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
