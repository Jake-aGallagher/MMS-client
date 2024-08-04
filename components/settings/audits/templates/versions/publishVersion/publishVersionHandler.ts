import { GlobalDebug } from '../../../../../utility/debug/globalDebug';
import { publishVersionConn } from './publishVersionConn';

export const publishVersionHandler = async (templateId: number, version: number, closeModal: () => void) => {
    const alertString = `There has been an issue publishing this Version, please try again.`;
    try {
        const response = await publishVersionConn({
            templateId,
            version,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('publisheVersionHandler', [['error', err]]);
        alert(alertString);
    }
};
