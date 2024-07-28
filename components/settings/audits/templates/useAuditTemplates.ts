import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../utility/routing/addressAPI";
import { GlobalDebug } from "../../../utility/debug/globalDebug";

interface Template {
    id: number;
    title: string;
    latest_version: number;
}

export const useAuditTemplates = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [templates, setTemplates] = useState<Template[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/audit/templates`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAuditTemplates/getHandler', [['response', response]]);
            setTemplates(response.data.auditTemplates);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAuditTemplates/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    return { templates, loading, error, reload };
}