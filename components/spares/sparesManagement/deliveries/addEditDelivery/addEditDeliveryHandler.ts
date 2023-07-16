import { addEditDeliveryConn } from './addEditDeliveryConn';

interface Contents {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
}

export const addEditDeliveryHandler = async (data: any, contents: Contents[], id: number, currentProperty: number, closeModal: () => void, name: string) => {
    const alertString = `There has been an issue ${name.length > 0 ? 'editing' : 'creating'} this Delivery, please try again.`;
    const contentsRemovedNone = contents.filter((item) => item.num_used > 0);
    if (contentsRemovedNone.length > 0) {
        try {
            const response = await addEditDeliveryConn({
                id,
                name: data.name,
                supplier: data.supplier,
                courier: data.courier,
                placed: data.placed,
                due: data.due,
                arrived: data.arrived,
                contents: contentsRemovedNone,
                propertyId: currentProperty,
            });
            if (response.data.created) {
                closeModal();
            } else {
                alert(alertString);
            }
        } catch (err) {
            alert(alertString);
        }
    }
};
