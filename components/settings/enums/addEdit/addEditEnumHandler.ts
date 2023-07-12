import { addEditEnumConn } from './addEditEnumConn';

export const addEditEnumHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Enum, please try again.`;
    try {
        const response = await addEditEnumConn({
            id: id ? id : 0,
            value: data.name,
            enumTypeId: data.type,
            listPriority: data.order,
            payload: data.effectOne,
            payloadTwo: data.effectTwo,
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
