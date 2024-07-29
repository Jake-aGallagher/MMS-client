import axios from 'axios';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';

export const addEditTopicConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/audit/topic`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
