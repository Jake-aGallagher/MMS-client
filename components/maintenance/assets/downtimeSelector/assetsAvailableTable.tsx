import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    assetList: Asset[];
    updateAssetsSelected: (item: Asset) => void;
}

interface Asset {
    id: number;
    name: string;
    time: number;
}

const AssetsAvailableTable = (props: Props) => {
    const showCurrent = props.assetList.map((item) => (
        <tr className="border-t-1 h-12 border-solid border-primary" key={'current_item_' + item.id}>
            <td className="text-center">{item.name}</td>
            <td className="hover:text-primary transition-all cursor-pointer" onClick={() => props.updateAssetsSelected(item)}>
                <FontAwesomeIcon icon={faPlus} className="h-5 m-auto" />
            </td>
        </tr>
    ));

    return <tbody>{showCurrent}</tbody>;
};

export default AssetsAvailableTable;
