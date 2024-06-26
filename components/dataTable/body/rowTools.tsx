import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import ModalBase from '../../layout/modal/modal';

interface Props {
    id: number;
    name: string;
    url?: string;
    functions: string[];
    modalType: string;
    reload: () => void;
}

const RowTools = (props: Props) => {
    const toolsIconRef = useRef<any>(null);
    const overlayRef = useRef<any>(null);
    const [showTools, setShowTools] = useState(false);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: {} }>({ view: false, type: '', payload: {} });

    const handleToolsClick = () => {
        setShowTools((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (toolsIconRef.current && !toolsIconRef.current.contains(event.target) && overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowTools(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const functionClicked = (functionType: 'addEdit' | 'delete' | 'adjustStock') => {
        setShowTools(false);
        setModal({ view: true, type: functionType + props.modalType, payload: { id: props.id, name: props.name, url: props.url } });
    };

    const toolOptions = props.functions.map((funcString) => {
        if (funcString == 'edit') {
            return (
                <button onClick={() => functionClicked('addEdit')} key={props.id + 'EditFunction'} className="flex flex-row justify-start hover:text-primary transition-all">
                    <FontAwesomeIcon icon={faPenToSquare} className="h-5" />
                    &nbsp;Edit
                </button>
            );
        }
        if (funcString == 'delete') {
            return (
                <button onClick={() => functionClicked('delete')} key={props.id + 'DeleteFunction'} className="flex flex-row justify-start hover:text-primary transition-all">
                    <FontAwesomeIcon icon={faTrashCan} className="h-5" />
                    &nbsp;Delete
                </button>
            );
        }
        if (funcString == 'adjust_stock') {
            return (
                <button onClick={() => functionClicked('adjustStock')} key={props.id + 'AdjustStockFunction'} className="flex flex-row justify-start hover:text-primary transition-all">
                    <FontAwesomeIcon icon={faPenToSquare} className="h-5" />
                    &nbsp;Adjust Stock
                </button>
            );
        }
    });

    return (
        <>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: {} }), props.reload()]} /> : null}
            <div className='flex flex-row justify-center'>
                <div onClick={handleToolsClick} ref={toolsIconRef} className="group flex flex-row justify-center relative w-10 py-1 rounded-md hover:cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="h-5 parent group-hover:text-primary transition-all" />
                    {showTools && (
                        <div
                            ref={overlayRef}
                            className="absolute top-4 -left-36 rounded-b-md rounded-tl-md z-20 border-primary border-1 p-2 flex flex-col bg-background w-40 shadow-2xl transition-all"
                        >
                            {toolOptions}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RowTools;
