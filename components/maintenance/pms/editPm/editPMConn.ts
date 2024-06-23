import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const editPMConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/maintenance/pms/edit`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
