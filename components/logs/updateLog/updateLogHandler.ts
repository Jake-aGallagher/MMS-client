import { GlobalDebug } from '../../debug/globalDebug';
import { updateLogConn } from './updateLogConn';

export const updateLogHandler = async (logId: number, data: any, propertyId: number, userId: number, closeModal: () => void) => {
    const alertString = 'There has been an issue Updating this log, please try again.';
    try {
        const response = await updateLogConn({
            logId,
            fieldData: data,
            completedBy: userId,
            propertyId,
        });
        if (response.data.updated) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('updateLogHandler', [
            ['error', err],
            ['data', data],
            ['propertyId', propertyId],
            ['logId', logId],
            ['userId', userId],
        ]);
        alert(alertString);
    }
};
