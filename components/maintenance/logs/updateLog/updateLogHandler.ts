import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { updateLogConn } from './updateLogConn';

export const updateLogHandler = async (logId: number, data: any, facilityId: number, userId: number, closeModal: () => void) => {
    const alertString = 'There has been an issue Updating this log, please try again.';
    try {
        const response = await updateLogConn({
            logId,
            fieldData: data,
            completedBy: userId,
            facilityId,
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
            ['facilityId', facilityId],
            ['logId', logId],
            ['userId', userId],
        ]);
        alert(alertString);
    }
};
