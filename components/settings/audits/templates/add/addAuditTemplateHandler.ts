import { GlobalDebug } from '../../../../utility/debug/globalDebug';
import { addAuditTemplateConn } from './addAuditTemplateConn';

export const addAuditTemplateHandler = async (title: string, closeModal: () => void) => {
    const alertString = `There has been an issue creating this Audit Template, please try again.`;
    try {
        const response = await addAuditTemplateConn({
            title: title,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addAuditTemplateHandler', [['error', err]]);
        alert(alertString);
    }
};
