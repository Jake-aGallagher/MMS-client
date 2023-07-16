import axios from 'axios';
import { SERVER_URL } from '../../../../routing/addressAPI';

export const addEditDeliveryConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/spares/delivery/add-edit`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
