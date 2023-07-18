import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const adjustSparesStockConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/spares/adjust-stock`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
