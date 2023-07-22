import { useEffect, useState } from 'react';
import {
    adjustStockType,
    arrivedType,
    completedType,
    contentsType,
    dateType,
    deleteType,
    deleteWithHideType,
    editType,
    editWithHideType,
    linkType,
    remainingStockType,
    urlType,
} from './rowTypeFunctions';
import Loading from '../loading/loading';
import SearchBar from './searchBar';
import SelectSearch from './selectSearch';

interface Props {
    config: {
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
        searchable: boolean;
        selectSearch?: boolean;
        selectSearchType?: string;
        selectSearchOptions?: {type: string}[];
        linkColPrefix?: string;
    };
    data: {}[];
    adjustStockFunction?: (id: number, name: string, quantityRemaining: number) => void;
    deleteFunction?: (id: number, name: string) => void;
    editFunction?: (id: number, name: string) => void;
    viewTooManyItems?: (contents: Contents[], name: string) => void;
}

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

const SortableTable = (props: Props) => {
    const unfilteredData = props.data
    const [filteredData, setFilteredData] = useState<{}[]>()
    const [sortedData, setSortedData] = useState<{}[]>();
    const [currentSort, setCurrentSort] = useState({ col: props.config.headers[0].id, dir: 'DSC' });
    const [searchType, setSearchType] = useState(props.config.selectSearchType ? props.config.selectSearchType : '');
    const [searchTerm, setSearchTerm] = useState(props.config.selectSearchOptions ? props.config.selectSearchOptions[0].type : '');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sortData(currentSort.col, currentSort.dir)
    }, []);

    useEffect(() => {
        filterFunction()
    }, [searchTerm])

    useEffect(() => {
        sortData(currentSort.col, currentSort.dir)
    }, [filteredData])

    const filterFunction = () => {
        if (searchTerm.length > 0) {
            /// @ts-ignore
        const filtered = unfilteredData.filter((item) => item[searchType].toUpperCase().includes(searchTerm.toUpperCase()))
        setFilteredData(filtered)
        } else {
            setFilteredData(unfilteredData)
        }
    }

    const sortFunction = (chosenSort: string) => {
        if (chosenSort === currentSort.col) {
            if (currentSort.dir === 'DSC') {
                setCurrentSort({ col: currentSort.col, dir: 'ASC' });
                sortData(currentSort.col, 'ASC');
            } else {
                setCurrentSort({ col: currentSort.col, dir: 'DSC' });
                sortData(currentSort.col, 'DSC');
            }
        } else {
            setCurrentSort({ col: chosenSort, dir: 'DSC' });
            sortData(chosenSort, 'DSC');
        }
    };

    const sortData = (col: string, dir: string) => {
        let unorderedData = (filteredData ? filteredData : props.data)
        if (unorderedData.length > 0) {
            if (dir === 'DSC') {
                /// @ts-ignore
                unorderedData.sort((a, b) => (b[col] > a[col] ? 1 : b[col] < a[col] ? -1 : 0));
            } else {
                /// @ts-ignore
                unorderedData.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0));
            }
        }
        setSortedData(unorderedData);
        setLoading(false);
    };

    const buildTableHead = props.config.headers.map((item) => {
        if (item.order) {
            return (
                <th
                    key={'head.' + item.id}
                    className="border-2 border-solid border-gray-500 px-2 cursor-pointer select-none"
                    onClick={() => sortFunction(item.id)}
                >
                    <div className=" flex flex-row justify-center items-center">
                        {item.name}
                        {currentSort.col != item.id ? null : currentSort.dir === 'ASC' ? (
                            <div className="ml-2 text-2xl">&#8595;</div>
                        ) : (
                            <div className="ml-2 text-2xl">&#8593;</div>
                        )}
                    </div>
                </th>
            );
        } else {
            return (
                <th key={'head.' + item.id} className="border-2 border-solid border-gray-500 px-2 select-none">
                    {item.name}
                </th>
            );
        }
    });

    const buildTableBody = () => {
        if (sortedData && sortedData?.length > 0) {
            const table = sortedData!.map((rowInfo) => (
                /// @ts-ignore
                <tr key={'body' + rowInfo[props.config.headers[0].id]}>{buildTableRow(rowInfo)}</tr>
            ));
            return table;
        } else return;
    };

    const buildTableRow = (rowInfo: any) => {
        const rowData = props.config.headers.map((header) => {
            let inner: any = null;
            switch (header.type) {
                case 'string':
                    inner = rowInfo[header.id];
                    break;

                case 'link':
                    inner = linkType(rowInfo[header.id], props.config.linkColPrefix!, rowInfo[header.id]);
                    break;

                case 'linkWithName':
                    inner = linkType(rowInfo[header.nameParam!], props.config.linkColPrefix!, rowInfo[header.id]);
                    break;

                case 'url':
                    inner = urlType(rowInfo[header.id]);
                    break;

                case 'date':
                    inner = dateType(rowInfo[header.id]);
                    break;

                case 'completed':
                    inner = completedType(rowInfo[header.id]);
                    break;

                case 'arrived':
                    inner = arrivedType(rowInfo[header.id]);
                    break;

                case 'contents':
                    inner = contentsType(rowInfo[header.id], rowInfo[header.functionNamePointer!], props.viewTooManyItems!);
                    break;

                case 'remaining_stock':
                    inner = remainingStockType(rowInfo[header.id], rowInfo[header.avgUsagePointer!]);
                    break;

                case 'adjust_stock':
                    inner = adjustStockType(
                        rowInfo[header.functionIdPointer!],
                        rowInfo[header.functionNamePointer!],
                        rowInfo[header.quantRemainPonter!],
                        props.adjustStockFunction!
                    );
                    break;

                case 'edit':
                    inner = editType(rowInfo[header.functionIdPointer!], rowInfo[header.functionNamePointer!], props.editFunction!);
                    break;

                case 'editWithHide':
                    inner = editWithHideType(
                        rowInfo[header.functionIdPointer!],
                        rowInfo[header.functionNamePointer!],
                        rowInfo[header.hidePointer!],
                        props.editFunction!
                    );
                    break;

                case 'delete':
                    inner = deleteType(rowInfo[header.functionIdPointer!], rowInfo[header.functionNamePointer!], props.deleteFunction!);
                    break;

                case 'deleteWithHide':
                    inner = deleteWithHideType(
                        rowInfo[header.functionIdPointer!],
                        rowInfo[header.functionNamePointer!],
                        rowInfo[header.hidePointer!],
                        props.deleteFunction!
                    );
                    break;

                default:
                    inner = rowInfo[header.id];
                    break;
            }
            return <td key={'cell.' + header.id} className="border border-solid border-gray-500 px-2 text-center p-2">{inner}</td>;
        });
        return rowData;
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {props.config.searchable && props.config.headers.length > 0 ? (
                        <SearchBar headers={props.config.headers} searchType={searchType} searchTerm={searchTerm} setSearchType={setSearchType} setSearchTerm={setSearchTerm}/>
                    ) : props.config.selectSearch && props.config.selectSearchOptions ? (
                        <SelectSearch searchOptions={props.config.selectSearchOptions} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    ) : null}
                    <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                        <thead>
                            <tr className="bg-gray-200">{buildTableHead}</tr>
                        </thead>
                        <tbody>{buildTableBody()}</tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default SortableTable;
