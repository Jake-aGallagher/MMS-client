import { deleteFormConn } from './deleteFormConn';

export const deleteFormHandler = async (name: string, url: string, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue deleting ${name}, please try again.`;
    try {
        const response = await deleteFormConn(url, id);
        if (response.data.deleted) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        alert(alertString);
    }
};
