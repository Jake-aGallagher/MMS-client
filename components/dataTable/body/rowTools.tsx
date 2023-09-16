import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalBase from '../../modal/modal';

interface Props {
    id: number;
    name: string;
    functions: string[];
    modalType: string;
    reload: () => void;
}

const RowTools = (props: Props) => {
    const [showTools, setShowTools] = useState(false);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: {} }>({ view: false, type: '', payload: {} });

    const functionClicked = (functionType: 'addEdit' | 'delete' | 'adjustStock') => {
        setShowTools(false);
        setModal({ view: true, type: functionType + props.modalType, payload: { id: props.id, name: props.name } });
        console.log(functionType, ' : ', props.modalType, ' : ', props.id)
    };

    const toolOptions = props.functions.map((funcString) => {
        if (funcString == 'edit') {
            return (
                <button onClick={() => functionClicked('addEdit')} key={props.id + 'EditFunction'} className="flex flex-row justify-start">
                    <FontAwesomeIcon icon={faPenToSquare} className="h-5" />
                    &nbsp;Edit
                </button>
            );
        }
        if (funcString == 'delete') {
            return (
                <button onClick={() => functionClicked('delete')} key={props.id + 'DeleteFunction'} className="flex flex-row justify-start">
                    <FontAwesomeIcon icon={faTrashCan} className="h-5" />
                    &nbsp;Delete
                </button>
            );
        }
        if (funcString == 'adjust_stock') {
            return (
                <button onClick={() => functionClicked('adjustStock')} key={props.id + 'AdjustStockFunction'} className="flex flex-row justify-start">
                    <FontAwesomeIcon icon={faPenToSquare} className="h-5" />
                    &nbsp;Adjust Stock
                </button>
            );
        }
    });

    return (
        <>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: {} }), props.reload()]} /> : null}
            {showTools ? (
                <>
                    <div>{toolOptions}</div>
                    <div onClick={() => setShowTools((prev) => !prev)} className="flex flex-row justify-center">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="h-5" />
                    </div>
                </>
            ) : (
                <div onClick={() => setShowTools((prev) => !prev)} className="flex flex-row justify-center">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="h-5" />
                </div>
            )}
        </>
    );
};

export default RowTools;
