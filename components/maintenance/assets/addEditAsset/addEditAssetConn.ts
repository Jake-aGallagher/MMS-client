import axios from 'axios';
import { SERVER_URL } from '../../../routing/addressAPI';

export const addEditAssetConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/asset`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};