import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SetStateAction } from 'react';

interface Props {
    sparesSelected: SparesSelected[];
    setSparesSelected: (value: SetStateAction<SparesSelected[]>) => void;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface SparesSelected extends Spare {
    quantity: number;
}

const SparesAddRemoveTable = (props: Props) => {
    const updateSparesSelected = (id: number, type: 'add' | 'minus' | 'remove') => {
        const index = props.sparesSelected.findIndex((item) => item.id == id);
        const spareItem = props.sparesSelected[index];
        const newArr = [...props.sparesSelected];
        if (type == 'add') {
            newArr[index] = { ...spareItem, quantity: spareItem.quantity + 1 };
        } else if (type == 'minus' && spareItem.quantity > 0) {
            newArr[index] = { ...spareItem, quantity: spareItem.quantity - 1 };
        } else if (type == 'remove') {
            newArr[index] = { ...spareItem, quantity: 0 };
        }
        props.setSparesSelected(newArr);
    };

    const sparesTable = props.sparesSelected.map((item) => (
        <tr className="border-t-1 border-solid border-primary" key={'current_item_' + item.id}>
            <td className="text-center">{item.part_no}</td>
            <td className="text-center">{item.name}</td>
            <td className="text-center">{item.quantity}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'add')}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'minus')}>
                <FontAwesomeIcon icon={faMinus} className="h-5 m-auto" />
            </td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => updateSparesSelected(item.id, 'remove')}>
                <FontAwesomeIcon icon={faTrashCan} className="h-5 m-auto" />
            </td>
        </tr>
    ));
    return <tbody>{sparesTable}</tbody>;
};

export default SparesAddRemoveTable;
