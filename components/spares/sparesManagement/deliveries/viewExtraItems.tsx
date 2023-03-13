import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import Loading from '../../../loading/loading';
import RetrieveError from '../../../error/retrieveError';
import ModalBase from '../../../modal/modal';

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

interface ModalProps {
    closeModal: () => void;
    payload: { contents: Contents[]; name: string };
}

const ViewExtraItems = (props: ModalProps) => {
    const items = props.payload.contents.map((i) => (
        <div className="flex flex-row border-2 border-blue-600 rounded-md my-4 ml-4 w-fit px-2" key={'spares_item_' + i.spare_id}>
            {i.part_no + ' / ' + i.name + ' / Quantity: ' + i.quantity}
        </div>
    ));

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">{props.payload.name}</h1>

            {items}

            <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewExtraItems;
