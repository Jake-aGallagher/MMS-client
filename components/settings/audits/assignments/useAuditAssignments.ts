import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../utility/routing/addressAPI";
import { GlobalDebug } from "../../../utility/debug/globalDebug";

interface Assignment {
    subtype_id: number,
    subtype_title: string,
    assignment_id?: number,
    assignment_title?: string, 
}

export const useAuditAssignments = (type: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/audit/assignments/${type}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAuditAssignments/getHandler/' + type, [['response', response]]);
            setAssignments(response.data.assignments)
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAuditAssignments/getHandler/' + type, [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    return { assignments, loading, error, reload };
}