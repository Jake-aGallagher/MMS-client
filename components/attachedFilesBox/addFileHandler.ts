import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

export const addFileHandler = async (file: Blob, model: string, id: number, reload: () => void) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append(
        'data',
        JSON.stringify({
            model: model,
            id: id,
        })
    );
    const response = await axios.post(`${SERVER_URL}/file`, formData, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
    if (response.data.created) {
        reload();
    } else {
        alert('There has been an issue attaching this file, please try again.');
    }
};
