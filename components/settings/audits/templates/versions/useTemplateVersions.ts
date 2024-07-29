import { useEffect, useState } from 'react';
import { GlobalDebug } from '../../../../utility/debug/globalDebug';
import axios from 'axios';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';

interface TemplateVersion {
    id: number;
    version: number;
    title: string;
}

export const useTemplateVersions = (templateId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [templateVersions, setTemplateVersions] = useState<TemplateVersion[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/audit/versions/${templateId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useTemplateVersions/getHandler', [['response', response]]);
            setTemplateVersions(response.data.templateVersions);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useTemplateVersions/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { templateVersions, loading, error, reload };
};
