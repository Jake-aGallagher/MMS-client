import axios from 'axios';
import { SERVER_URL } from '../../utility/routing/addressAPI';

export const auditWizardConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/audit/wizard`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
