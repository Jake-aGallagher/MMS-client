import { GlobalDebug } from '../../debug/globalDebug';
import { adjustSparesStockConn } from './adjustSparesStockConn';

export const adjustSparesStockHandler = async (data: any, id: number, quantityRemaining: number, closeModal: () => void) => {
    const alertString = `There has been an issue adjusting this stock level, please try again.`;
    try {
        const response = await adjustSparesStockConn({
            id: id,
            newStock: quantityRemaining + data.diff,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('adjustSparesStockHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['quantityRemaining', quantityRemaining]
        ]);
        alert(alertString);
    }
};
