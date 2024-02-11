import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    sparesList: Spares[];
    updateSparesSelected: (item: Spares) => void;
}

interface Spares {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

const SparesAvailableTable = (props: Props) => {
    const showCurrent = props.sparesList.map((item) => (
        <tr className="border-t-1 border-solid border-primary" key={'current_item_' + item.id}>
            <td className="text-center">{item.part_no}</td>
            <td className="text-center">{item.name}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => props.updateSparesSelected(item)}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
        </tr>
    ));

    return <tbody>{showCurrent}</tbody>;
};

export default SparesAvailableTable;
