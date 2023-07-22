import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

export const linkType = (name: string | number, linkColPrefix: string, link: string) => {
    return (
        <Link href={linkColPrefix + link} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
            {name}
        </Link>
    );
};

export const dateType = (dateString: string) => {
    return dateString === '00/00/00' ? '' : dateString;
};

export const urlType = (urlString: string) => {
    return (
        <a className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600" href={urlString} target="_blank" rel='noreferrer'>
            {urlString}
        </a>
    );
};

export const completedType = (completed: number) => {
    return completed === 1 ? <div>&#10004;</div> : <div>&#10060;</div>;
};

export const arrivedType = (arrived: number) => {
    return arrived === 1 ? <div>&#10004;</div> : null;
};

export const userGroupType = (level: number) => {
    switch (level) {
        case 4:
            return 'Admin';
        case 3:
            return 'Manager';
        case 2:
            return 'Engineer';
        default:
            return 'Staff';
    }
};

export const remainingStockType = (remainingStock: number, usage: number) => {
    if (remainingStock === 0) {
        return (
            <div className="flex flex-row justify-center items-center">
                <FontAwesomeIcon icon={faXmark} className="mr-1 w-5 text-red-600" /> {remainingStock}
            </div>
        );
    } else if (usage === 0 || remainingStock / usage > 1) {
        return (
            <div className="flex flex-row justify-center items-center">
                <FontAwesomeIcon icon={faCheck} className="mr-1 w-5 text-green-500" /> {remainingStock}
            </div>
        );
    } else {
        return (
            <div className="flex flex-row justify-center items-center">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1 w-5 text-yellow-500" /> {remainingStock}
            </div>
        );
    }
};

export const adjustStockType = (
    id: number,
    name: string,
    remaining_quantity: number,
    adjustStockFunction: (id: number, name: string, quantityRemaining: number) => void
) => {
    if (adjustStockFunction) {
        return (
            <div className="flex flex-row justify-center items-center hover:cursor-pointer select-none" onClick={() => adjustStockFunction!(id, name, remaining_quantity)}>
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1 w-5" />
            </div>
        );
    }
};

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

export const contentsType = (contents: Contents[], name: string, viewTooManyItems: (contents: Contents[], name: string) => void) => {
    if (contents.length < 5) {
        const list = contents.map((i) => <li key={'contentsItem' + i.spare_id}>{i.part_no + ' / ' + i.name + ' / Quantity: ' + i.quantity}</li>);
        return <ul>{list}</ul>;
    } else if (viewTooManyItems) {
        return <button onClick={() => viewTooManyItems!(contents, name)}>&#x1F50D;</button>;
    }
};

export const editType = (id: number, name: string, editFunction: (id: number, name: string) => void) => {
    if (editFunction) {
        return (
            <div className="flex flex-row justify-center items-center hover:cursor-pointer select-none" onClick={() => editFunction!(id, name)}>
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1 w-5" />
            </div>
        );
    }
};

export const editWithHideType = (id: number, name: string, hide: number, editFunction: (id: number, name: string) => void) => {
    if (editFunction && hide != 1) {
        return (
            <div className="flex flex-row justify-center items-center hover:cursor-pointer select-none" onClick={() => editFunction!(id, name)}>
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1 w-5" />
            </div>
        );
    } else {
        return;
    }
};

export const deleteType = (id: number, name: string, deleteFunction: (id: number, name: string) => void) => {
    if (deleteFunction) {
        return (
            <div className="flex flex-row justify-center items-center hover:cursor-pointer select-none" onClick={() => deleteFunction!(id, name)}>
                <FontAwesomeIcon icon={faXmark} className="mr-1 w-5 text-red-600" />
            </div>
        );
    }
};

export const deleteWithHideType = (id: number, name: string, hide: number, deleteFunction: (id: number, name: string) => void) => {
    if (deleteFunction && hide != 1) {
        return (
            <div className="flex flex-row justify-center items-center hover:cursor-pointer select-none" onClick={() => deleteFunction!(id, name)}>
                <FontAwesomeIcon icon={faXmark} className="mr-1 w-5 text-red-600" />
            </div>
        );
    } else {
        return;
    }
};
