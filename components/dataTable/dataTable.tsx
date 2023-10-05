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
        idPointer?: string;
        namePointer?: string;
        reload?: () => void;
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
    }, [filtersObj]);

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
        setSorted(sortTableData(unorderedData, col, dir));
        setLoading(false);
    };

    return (
        <>
            <LoadingNoDataError loading={loading} error={false}>
                {props.config.searchable ? <DataTableSearch headers={props.config.headers} currentFilters={filtersObj} setFiltersObj={setFiltersObj} /> : null}
                <table className="min-w-full table-auto bg-secondary rounded-xl shadow-lg">
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
                                idPointer={props.config.idPointer}
                                namePointer={props.config.namePointer}
                                reload={props.config.reload}
                            />
                        ))}
                    </tbody>
                </table>
            </LoadingNoDataError>
        </>
    );
};

export default DataTable;
