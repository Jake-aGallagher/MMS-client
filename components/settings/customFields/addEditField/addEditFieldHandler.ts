import { addEditFieldConn } from './addEditFieldConn';

export const addEditFieldHandler = async (id: number, model: string, data: any, closeModal: () => void) => {
    const alertString = 'There has been an issue creating this Field, please try again.';
    try {
        const response = await addEditFieldConn({
            id,
            model,
            modelId: null,
            type: data.type,
            enumGroupId: data.options || null,
            name: data.name,
            required: data.required == 'Yes' ? 1 : 0,
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
