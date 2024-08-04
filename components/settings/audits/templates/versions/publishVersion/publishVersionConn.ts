import axios from 'axios';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';

export const publishVersionConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/audit/version/publish`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
