import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

export const deleteFileHandler = async (id: string, reload?: () => void) => {
    await axios.delete(`${SERVER_URL}/file/${id}`, {
        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
    });
    if (reload) {
        reload();
    }
};
