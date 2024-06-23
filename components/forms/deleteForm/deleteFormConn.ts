import axios from 'axios';
import { SERVER_URL } from '../../utility/routing/addressAPI';

export const deleteFormConn = async (url: string, id: number) => {
    return await axios.delete(`${SERVER_URL}/${url}/${id}`, {
        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
    });
};
