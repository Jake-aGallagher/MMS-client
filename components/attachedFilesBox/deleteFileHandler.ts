import axios from "axios";
import { SERVER_URL } from "../routing/addressAPI";

export const deleteFileHandler = async (id: string, reload: () => void) => {
    await axios.delete(`${SERVER_URL}/file`, {
        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
        data: {
            id: id,
        },
    });
    reload();
}