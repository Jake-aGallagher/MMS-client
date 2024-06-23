import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';

export const addEditAssetConn = async (data: {}) => {
    return await axios.post(`${SERVER_URL}/maintenance/asset`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};