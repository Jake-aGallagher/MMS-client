import { useEffect, useState } from 'react';
import DataTableHead from './head/dataTableHead';
import DataTableRow from './body/dataTableRow';
import { sortBuilder } from './head/sortBuilder';
import { sortTableData } from './head/sortData';
import DataTableSearch from './search/dataTableSearch';
import { dataTableSearchFilter } from './search/dataTableSearchFilter';
import LoadingNoDataError from '../loading/loadingNoDataError';
import { columnTypeMap } from './search/columnTypeMap';

interface Props {
    config: {
        headers: {
            id: string;
            name: string;
            type: string;
            search: boolean;
            order: boolean;
            nameParam?: string;
            avgUsagePointer?: string;
            quantRemainPonter?: string;
            functions?: string[];
        }[];
        searchable: boolean;
        selectSearch?: boolean;
        selectSearchType?: string;
        selectSearchOptions?: { type: string }[];
        linkColPrefix?: string;
        reverseSort?: boolean;
        modalType?: string;
        deleteUrl?: string;
        idPointer?: string;
        namePointer?: string;
        reload?: () => void;
        title?: string;
    };
    data: {}[];
    viewTooManyItems?: (contents: Contents[], name: string) => void;
}

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

const DataTable = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const rawData = props.data;
    const [filtersObj, setFiltersObj] = useState<{ [key: string]: string | number }>({});
    const [filtered, setFiltered] = useState<{}[]>(rawData);
    const [sorted, setSorted] = useState<{}[]>([]);
    const [currentSort, setCurrentSort] = useState({ col: props.config.headers[0].id, dir: props.config.reverseSort ? 'DSC' : 'ASC' });
    const colTypeMap = columnTypeMap(props.config.headers);

    useEffect(() => {
        filterData();
    }, [props, filtersObj]);

    useEffect(() => {
        sortData(currentSort.col, currentSort.dir);
    }, [filtered]);

    const filterData = () => {
        setFiltered(dataTableSearchFilter(rawData, filtersObj, colTypeMap));
    };

    const sortFunction = (chosenSort: string) => {
        const sortObj = sortBuilder(chosenSort, currentSort);
        setCurrentSort({ col: sortObj.col, dir: sortObj.dir });
        sortData(sortObj.col, sortObj.dir);
    };

    const sortData = (col: string, dir: string) => {
        let unorderedData = filtered;
        setSorted(sortTableData(unorderedData, col, dir, colTypeMap[col]));
        setLoading(false);
    };

    return (
        <LoadingNoDataError loading={loading} error={false}>
            {props.config.searchable ? <DataTableSearch headers={props.config.headers} currentFilters={filtersObj} setFiltersObj={setFiltersObj} /> : null}
            <div className="w-full h-full relative">
                <div className="overflow-x-auto rounded-md shadow-md">
                    <table className="w-full table-auto bg-secondary">
                        {props.config.title ? <caption className="w-full bg-secondary text-lg">{props.config.title}</caption> : null}
                        <DataTableHead headers={props.config.headers} currentSort={currentSort} setCurrentSort={setCurrentSort} sortFunction={sortFunction} />
                        <tbody>
                            {sorted.map((item, i) => (
                                <DataTableRow
                                    key={'row_' + i}
                                    data={item}
                                    headers={props.config.headers}
                                    linkColPrefix={props.config.linkColPrefix}
                                    viewTooManyItems={props.viewTooManyItems}
                                    modalType={props.config.modalType}
                                    deleteUrl={props.config.deleteUrl}
                                    idPointer={props.config.idPointer}
                                    namePointer={props.config.namePointer}
                                    reload={props.config.reload}
                                />
                            ))}
                        </tbody>
                        <tfoot className="bg-secondary h-10 text-center">
                            <tr>
                                <td colSpan={100}>
                                    Showing Results ... to ... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Results Per Page:{' '}
                                    <select>
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                    </select>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </LoadingNoDataError>
    );
};

export default DataTable;
