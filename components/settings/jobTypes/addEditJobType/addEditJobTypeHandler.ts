import { addEditJobTypeConn } from './addEditJobTypeConn';

export const addEditJobTypeHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Job Type, please try again.`;
    try {
        const response = await addEditJobTypeConn({
            id: id ? id : 0,
            value: data.value,
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
