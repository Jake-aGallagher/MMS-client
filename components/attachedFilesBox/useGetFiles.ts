import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../routing/addressAPI";

export const useGetFiles = (model: string, id: number) => {
    const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
    
    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        getfilesHandler();
    }

    const getfilesHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/files/${model}/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.files) {
                setFiles(response.data.files);
            }
        } catch (err) {
            alert('There has been an issue retrieving files, please try again.');
        }
    };
    
    return {files, reload}
}