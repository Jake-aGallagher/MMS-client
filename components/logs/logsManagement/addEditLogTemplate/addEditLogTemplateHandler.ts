import { addEditLogTemplateConn } from './addEditLogTemplateConn';

export const addEditLogTemplateHandler = async (id: number, data: any, propertyId: number, closeModal: () => void) => {
    const alertString = 'There has been an issue creating this Log Template, please try again.';
    try {
        const response = await addEditLogTemplateConn({
            id,
            propertyId: propertyId,
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
        alert(alertString);
    }
};
