import { addEditStatusTypeConn } from './addEditStatusTypeConn';

export const addEditStatusTypeHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Job Status Type, please try again.`;
    try {
        const response = await addEditStatusTypeConn({
            id: id ? id : 0,
            value: data.value,
            canComplete: data.canComplete,
            listPriority: data.listPriority,
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
