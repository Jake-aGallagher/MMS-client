import { GlobalDebug } from '../../../../debug/globalDebug';
import { addScheduleConn } from './editScheduleConn';

export const editScheduleHandler = async (id: number, data: any, closeModal: () => void) => {
    const alertString = 'There has been an issue editing this PM Schedule, please try again.';
    try {
        const response = await addScheduleConn({
            id,
            type: data.type,
            title: data.title,
            description: data.description,
            editStart: data.editStart,
            scheduleStart: data.scheduleStart.toString() || null,
            frequencyTime: data.frequencyTime,
            frequencyUnit: data.frequencyUnit,
        });
        if (response.data.updated) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('editScheduleHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
