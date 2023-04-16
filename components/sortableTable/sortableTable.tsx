import {
    adjustStockType,
    arrivedType,
    authorityType,
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

    const buildTableHead = props.config.headers.map((item) => (
        <th key={'head.' + item.id} className="border-2 border-solid border-gray-500 px-2">
            {item.name}
        </th>
    ));
    const buildTableBody = () => {
        const table = props.data.map((rowInfo) => (
            /// @ts-ignore
            <tr key={'body' + rowInfo[props.config.headers[0].id]}>{buildTableRow(rowInfo)}</tr>
        ));
        return table;
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

                case 'authSwitch':
                    inner = authorityType(rowInfo[header.id]);
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
            return <td className="border border-solid border-gray-500 px-2 text-center p-2">{inner}</td>;
        });
        return rowData;
    };

    return (
        <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
            <thead>
                <tr className="bg-gray-200">{buildTableHead}</tr>
            </thead>
            <tbody>{buildTableBody()}</tbody>
        </table>
    );
};

export default SortableTable;
