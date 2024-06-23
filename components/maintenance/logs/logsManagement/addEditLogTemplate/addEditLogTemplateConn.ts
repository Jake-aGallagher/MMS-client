import axios from 'axios';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';

export const addEditLogTemplateConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/maintenance/logs/log-templates`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
