import axios from 'axios';
import { SERVER_URL } from '../../../../routing/addressAPI';

export const addScheduleConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/pms/schedules`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
