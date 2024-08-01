import { useEffect, useState } from 'react';
import { GlobalDebug } from '../../../../utility/debug/globalDebug';
import axios from 'axios';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';

interface TemplateVersion {
    id: number;
    version: number;
    title: string;
    published: number;
}

interface Topic {
    id: number;
    title: string;
    sort_order: number;
    questions: Question[] | null;
}

interface Question {
    id: number;
    topic_id: number;
    question_type: string;
    sort_order: number;
    title: string;
    options: Option[] | null;
}

interface Option {
    id: number;
    question_id: number;
    title: string;
}

export const useTemplateVersion = (templateId: number, versionId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [templateVersion, setTemplateVersion] = useState<TemplateVersion>();
    const [topics, setTopics] = useState<Topic[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/audit/template/${templateId}/version/${versionId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useTemplateVersion/getHandler', [['response', response]]);
            setTemplateVersion(response.data.template);
            setTopics(response.data.topics)
            setLoading(false);
        } catch (err) {
            GlobalDebug('useTemplateVersion/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { templateVersion, topics, loading, error, reload };
};
