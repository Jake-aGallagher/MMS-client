import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';

export const deleteFormConn = async (url: string, id: number) => {
    return await axios.delete(`${SERVER_URL}/${url}`, {
        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
        data: {
            id: id,
        },
    });
};