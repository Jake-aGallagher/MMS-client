import { GlobalDebug } from '../../utility/debug/globalDebug';
import { auditWizardConn } from './auditWizardConn';

export const auditWizardHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue editing this Audit, please try again.`;
    try {
        const response = await auditWizardConn({
            id,
            data,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('auditWizardHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
