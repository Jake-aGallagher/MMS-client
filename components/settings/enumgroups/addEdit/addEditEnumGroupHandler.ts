import { addEditEnumGroupConn } from './addEditEnumGroupConn';

export const addEditEnumGroupHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Enum Group, please try again.`;
    try {
        const response = await addEditEnumGroupConn({
            id: id ? id : 0,
            value: data.name,
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
