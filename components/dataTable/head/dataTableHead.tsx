import { Dispatch, SetStateAction } from 'react';
import SparesTableIndexKey from '../../spares/index/sparesIndexTableKey';

interface Props {
    headers: {
        id: string;
        name: string;
        type: string;
        search: boolean;
        order: boolean;
        nameParam?: string;
        functionIdPointer?: string;
        functionNamePointer?: string;
        hidePointer?: string;
        avgUsagePointer?: string;
        quantRemainPonter?: string;
    }[];
    currentSort: { col: string; dir: string };
    setCurrentSort: Dispatch<
        SetStateAction<{
            col: string;
            dir: string;
        }>
    >;
    sortFunction: (chosenSort: string) => void;
}

const DataTableHead = (props: Props) => {
    const tooltips = (itemId: string) => {
        if (itemId === 'quant_remain') {
            return <SparesTableIndexKey />
        }
    }
    const headers = props.headers.map((item) => {
        if (item.order) {
            return (
                <th key={'head.' + item.id} className="px-2 cursor-pointer select-none" onClick={() => props.sortFunction(item.id)}>
                    <div className=" flex flex-row justify-center items-center font-semibold">
                        {item.name}
                        {props.currentSort.col != item.id ? null : props.currentSort.dir === 'ASC' ? <div className="ml-2 ">&#8595;</div> : <div className="ml-2 ">&#8593;</div>}
                        {tooltips(item.id)}
                    </div>
                </th>
            );
        } else {
            return (
                <th key={'head.' + item.id} className=" px-2 select-none font-semibold">
                    {item.name}
                </th>
            );
        }
    });

    return (
        <thead>
            <tr>{headers}</tr>
        </thead>
    );
};

export default DataTableHead;
