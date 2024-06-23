import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleInfo, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../layout/tooltip/tooltip';

export const StringData = (props: { string: string }) => {
    return <div>{props.string}</div>;
};

export const LinkData = (props: { name: string | number; linkColPrefix: string; link: string }) => {
    return (
        <Link href={props.linkColPrefix + props.link} className="border-b-1 border-black hover:text-accent hover:border-accent">
            {props.name}
        </Link>
    );
};

export const DateData = (props: { dateString: string }) => {
    return <div>{props.dateString === '00/00/00' ? '' : props.dateString}</div>;
};

export const UrlData = (props: { urlString: string }) => {
    return (
        <a className="border-b-1 border-black hover:text-accent hover:border-accent" href={props.urlString} target="_blank" rel="noreferrer">
            {props.urlString}
        </a>
    );
};

export const TickData = (props: { tick: number }) => {
    return <div>{props.tick === 1 ? <>&#10004;</> : <>&#10060;</>}</div>;
};

export const RemainingStockData = (props: { remainingStock: number; usage: number }) => {
    const level = props.remainingStock <= 0 ? 'none' : props.remainingStock / props.usage > 1 ? 'good' : 'low';
    const icon = level == 'none' ? faXmark : level == 'good' ? faCheck : faTriangleExclamation;
    const colour = level == 'none' ? 'text-red' : level == 'good' ? 'text-green' : 'text-yellow';
    const negative = props.remainingStock < 0;
    const negativeWarning = 'Please check negative stock level.'
    return (
        <div className="flex flex-row justify-center items-center">
            <FontAwesomeIcon icon={icon} className={`mr-1 w-5 ${colour}`} /> {props.remainingStock}
            {negative ? (
                <Tooltip text={negativeWarning} direction='left'>
                        <FontAwesomeIcon icon={faCircleInfo} className={`ml-1 mb-4 w-4 hover:text-accent`} />
                </Tooltip>
            ) : null}
        </div>
    );
};

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

export const ContentsData = (props: { contents: Contents[]; name: string; viewTooManyItems: (contents: Contents[], name: string) => void }) => {
    if (props.contents.length < 5) {
        const list = props.contents.map((i) => <li key={'contentsItem' + i.spare_id}>{i.part_no + ' / ' + i.name + ' / Quantity: ' + i.quantity}</li>);
        return <ul>{list}</ul>;
    } else if (props.viewTooManyItems) {
        return <button onClick={() => props.viewTooManyItems!(props.contents, props.name)}>&#x1F50D;</button>;
    }
};
