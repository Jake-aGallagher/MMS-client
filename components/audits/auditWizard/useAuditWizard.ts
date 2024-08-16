import { useEffect, useState } from "react";
import { AuditTopic } from "../../../commonTypes/audits";
import axios from "axios";
import { SERVER_URL } from "../../utility/routing/addressAPI";
import { GlobalDebug } from "../../utility/debug/globalDebug";
import { DefaultValues } from "../../../commonTypes/CustomFields";

export const useAuditWizard = (eventType: string, eventId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [auditId, setAuditId] = useState<number>(0);
    const [audit, setAudit] = useState<AuditTopic[]>([]);
    const [files, setFiles] = useState<{ [key: string]: { id: string; encodedId: string; name: string }[] }>({});
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({});

    useEffect(() => {
        reload();
    }, [])

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    }

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/audit/wizard/${eventType}/${eventId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAuditWizard/getHandler', [['response', response]]);
            const auditData: AuditTopic[] = response.data.audit;
            const defaults: DefaultValues = {};
            auditData.forEach((topic) => {
                topic.questions.forEach((question) => {
                    if (question.response) {
                        defaults[question.id] = question.response.responseValue;
                    }
                });
            })
            setDefaultValues(defaults);
            setAuditId(response.data.auditId);
            setAudit(response.data.audit);
            setFiles(response.data.files);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAuditWizard/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    return { auditId, audit, files, setFiles, defaultValues, loading, error };
}