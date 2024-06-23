import axios from 'axios';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';

export const addEditSparesNoteConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/spares/notes`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
