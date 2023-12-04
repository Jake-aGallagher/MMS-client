// @ts-nocheck
import { ContentsData, DateData, LinkData, RemainingStockData, StringData, TickData, UrlData } from './dataTypes';
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
        avgUsagePointer?: string;
        quantRemainPonter?: string;
        functions?: string[];
    }[];
    data: {};
    linkColPrefix?: string;
    viewTooManyItems?: (contents: Contents[], name: string) => void;
    deleteUrl?: string;
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
                case 'tools':
                    return <RowTools id={row[props.idPointer]} name={row[props.namePointer]} url={props.deleteUrl} functions={h.functions} modalType={props.modalType} reload={props.reload} />
                default:
                    return <StringData string={row[h.id]} />;
            }
        };
        return <td key={uuidv4()} className="px-2 text-center p-2">{switchTypes()}</td>;
    });

    return <tr className='odd:bg-secAlt even:bg-secondary outline-1 outline-accent hover:outline-dashed rounded-md'>{dataPoints}</tr>;
};

export default DataTableRow;
