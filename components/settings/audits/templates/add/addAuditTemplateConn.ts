import axios from 'axios';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';

export const addAuditTemplateConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/audit/template`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
