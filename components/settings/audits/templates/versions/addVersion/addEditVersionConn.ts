import axios from 'axios';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';

export const addEditVersionConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/audit/version`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
