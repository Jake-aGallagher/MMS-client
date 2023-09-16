// @ts-nocheck
import { AdjustStockData, ContentsData, DateData, DeleteData, EditData, LinkData, RemainingStockData, StringData, TickData, UrlData } from './dataTypes';
import { v4 as uuidv4 } from 'uuid';
import RowTools from './rowTools';

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

        
        functions?: string[];
    }[];
    data: {};
    linkColPrefix?: string;
    viewTooManyItems?: (contents: Contents[], name: string) => void;
    adjustStockFunction?: (id: number, name: string, quantityRemaining: number) => void;
    deleteFunction?: (id: number, name: string) => void;
    editFunction?: (id: number, name: string) => void;
    idPointer?: string;
    namePointer?: string;
    modalType?: string;
    reload?: () => void;
}

const DataTableRow = (props: Props) => {
    const row = props.data;
    const dataPoints = props.headers.map((h) => {
        const switchTypes = () => {
            switch (h.type) {
                case 'link':
                    return <LinkData name={row[h.id]} linkColPrefix={props.linkColPrefix!} link={row[h.id]} />;
                case 'linkWithName':
                    return <LinkData name={row[h.nameParam!]} linkColPrefix={props.linkColPrefix!} link={row[h.id]} />;
                case 'url':
                    return <UrlData urlString={row[h.id]} />;
                case 'date':
                    return <DateData dateString={row[h.id]} />;
                case 'tick':
                    return <TickData tick={row[h.id]} />;
                case 'contents':
                    return <ContentsData contents={row[h.id]} name={row[h.functionNamePointer!]} viewTooManyItems={props.viewTooManyItems!} />;
                case 'remaining_stock':
                    return <RemainingStockData remainingStock={row[h.id]} usage={row[h.avgUsagePointer!]} />;
                case 'adjust_stock':
                    return <AdjustStockData id={row[h.idPointer!]} name={row[h.namePointer!]} remaining={row[h.quantRemainPonter!]} adjustFunction={props.adjustStockFunction!} />;
                case 'edit':
                    return <EditData id={row[h.functionIdPointer!]} name={row[h.functionNamePointer!]} hide={0} editFunction={props.editFunction!} />;
                case 'editWithHide':
                    return <EditData id={row[h.functionIdPointer!]} name={row[h.functionNamePointer!]} hide={row[h.hidePointer!]} editFunction={props.editFunction!} />;
                case 'delete':
                    return <DeleteData id={row[h.functionIdPointer!]} name={row[h.functionNamePointer!]} hide={0} deleteFunction={props.deleteFunction!} />;
                case 'deleteWithHide':
                    return <DeleteData id={row[h.functionIdPointer!]} name={row[h.functionNamePointer!]} hide={row[h.hidePointer!]} deleteFunction={props.deleteFunction!} />;
                case 'tools':
                    return <RowTools id={row[props.idPointer]} name={row[props.namePointer]} functions={h.functions} modalType={props.modalType} reload={props.reload} />
                default:
                    return <StringData string={row[h.id]} />;
            }
        };
        return <td key={uuidv4()} className="border border-solid border-gray-500 px-2 text-center p-2">{switchTypes()}</td>;
    });

    return <tr>{dataPoints}</tr>;
};

export default DataTableRow;
