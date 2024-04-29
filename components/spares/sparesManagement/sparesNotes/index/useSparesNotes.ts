import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';
import { GlobalDebug } from '../../../../debug/globalDebug';

interface Note {
    id: number;
    title: string;
    content: string;
    created_date: string;
}

export const useSparesNotes = (currentFacility: number) => {
    const [numOfNotes, setNumOfNotes] = useState(0);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        if (currentFacility !== 0) {
            reload();
        }
    }, [currentFacility]);

    const reload = () => {
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/notes/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useSparesNotes/getHandler', [['response', response]]);
            setNotes(response.data);
            setNumOfNotes(response.data.length);
        } catch (err) {
            GlobalDebug('useSparesNotes/getHandler', [['error', err]]);
            alert('There has been an error retrieving you Notes');
        }
    };
    return { notes, numOfNotes, reload };
};
