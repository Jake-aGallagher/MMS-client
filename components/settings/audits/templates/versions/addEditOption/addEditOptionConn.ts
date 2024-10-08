import axios from 'axios';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';

export const addEditOptionConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/audit/option`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
