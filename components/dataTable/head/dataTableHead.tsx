import { Dispatch, SetStateAction } from 'react';

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
    const headers = props.headers.map((item) => {
        if (item.order) {
            return (
                <th key={'head.' + item.id} className="px-2 cursor-pointer select-none" onClick={() => props.sortFunction(item.id)}>
                    <div className=" flex flex-row justify-center items-center">
                        {item.name}
                        {props.currentSort.col != item.id ? null : props.currentSort.dir === 'ASC' ? <div className="ml-2 ">&#8595;</div> : <div className="ml-2 ">&#8593;</div>}
                    </div>
                </th>
            );
        } else {
            return (
                <th key={'head.' + item.id} className=" px-2 select-none">
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
