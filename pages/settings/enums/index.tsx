import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEnums } from '../../../components/settings/enums/index/useEnums';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';

const Enums = () => {
    const { enums, loading, error, reload } = useEnums();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const enumsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'typeString', name: 'Type', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'string', search: true, order: true },
            { id: 'payload', name: 'Effect 1', type: 'number', search: true, order: true },
            { id: 'payload_two', name: 'Effect 2', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'Enum',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };

    const addEnum = () => {
        setModal({ view: true, type: 'addEditEnum', payload: { id: 0, name: '' } });
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addEnum} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add Enum Value
                </button>
            </div>
            {modal.view ? (
                <ModalBase modalType={modal.type} payload={{ ...modal.payload, url: 'enum' }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} />
            ) : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumsTableConfig} data={enums} />
            </LoadingNoDataError>
        </div>
    );
};

export default Enums;
