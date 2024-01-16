import { addEditLogFieldConn } from './addEditLogFieldConn';

export const addEditLogFieldHandler = async (id: number, data: any, templateId: number, closeModal: () => void) => {
    const alertString = 'There has been an issue creating this Log Template Field, please try again.';
    try {
        const response = await addEditLogFieldConn({
            id,
            templateId,
            type: data.type,
            name: data.name,
            required: data.required == 'Yes' ? 1 : 0,
            guidance: data.guidance || '',
            order: data.order,
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
