import axios from 'axios';
import { SERVER_URL } from '../../utility/routing/addressAPI';

export const addEditFacilityConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/facilities`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
