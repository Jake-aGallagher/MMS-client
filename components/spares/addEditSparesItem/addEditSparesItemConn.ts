import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const addEditSparesItemConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/spares/add-edit`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
