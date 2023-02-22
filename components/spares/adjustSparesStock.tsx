import axios from 'axios';
import { useState } from 'react';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string; quantityRemaining: number };
}

const AdjustSparesStock = (props: ModalProps) => {
    const [diff, setDiff] = useState(0);
    const [newStock, setNewStock] = useState(props.payload.quantityRemaining);

    const changeDiff = (updatedDiff: number) => {
        if (Number.isNaN(updatedDiff)) {
            console.log('NaN');
            setDiff(0);
            setNewStock(props.payload.quantityRemaining);
        } else if (updatedDiff !== diff) {
            setDiff(updatedDiff);
            setNewStock(props.payload.quantityRemaining + updatedDiff);
        }
    };

    const changeUpdated = (updated: number) => {
        if (updated !== newStock) {
            setDiff(updated - props.payload.quantityRemaining);
            setNewStock(updated);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (newStock >= 0) {
            try {
                const response = await axios.put(
                    'http://localhost:3001/spares/adjust-stock',
                    {
                        id: props.payload.id,
                        newStock,
                    },
                    {
                        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                    }
                );
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert('There has been an issue adjusting this stock level, please try again.');
                }
            } catch (err) {
                alert('There has been an issue adjusting this stock level, please try again.');
            }
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Adjust Stock level for {props.payload.name}</h1>
            <form className="flex flex-col justify-start items-center px-4 pt-10 overflow-y-auto h-[calc(100%-104px)]">
                <div>Current Stock level</div>
                <div className="mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10">{props.payload.quantityRemaining}</div>

                <label htmlFor="difference">Difference</label>
                <input
                    id="difference"
                    type="number"
                    className="mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10"
                    value={diff}
                    onChange={(e) => changeDiff(parseInt(e.target.value))}
                />

                <label htmlFor="stock">New Stock Level</label>
                <input
                    id="stock"
                    type="number"
                    className="mb-4 rounded-sm text-xl font-semibold bg-transparent text-center w-28 h-10"
                    value={newStock}
                    onChange={(e) => changeUpdated(parseInt(e.target.value))}
                />

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={(e) => [e.preventDefault(), props.closeModal]}
                    >
                        Cancel
                    </button>
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => submitHandler(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdjustSparesStock;
