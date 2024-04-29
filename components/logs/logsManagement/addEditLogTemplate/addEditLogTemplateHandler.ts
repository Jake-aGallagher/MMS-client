import { GlobalDebug } from '../../../debug/globalDebug';
import { addEditLogTemplateConn } from './addEditLogTemplateConn';

export const addEditLogTemplateHandler = async (id: number, data: any, facilityId: number, closeModal: () => void) => {
    const alertString = 'There has been an issue creating this Log Template, please try again.';
    try {
        const response = await addEditLogTemplateConn({
            id,
            facilityId: facilityId,
            title: data.title,
            description: data.description,
            startNow: data.startNow,
            scheduleStart: data.scheduleStart.toString() || null,
            frequencyTime: data.frequencyTime,
            frequencyUnit: data.frequencyUnit,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditLogTemplateHandler', [
            ['error', err],
            ['data', data],
            ['facilityId', facilityId],
            ['id', id],
        ]);
        alert(alertString);
    }
};
