import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEnums } from '../../../components/settings/enums/index/useEnums';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';

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
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="ml-8 hover:text-accent flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addEnum} className="ml-8 hover:text-accent flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add Enum Value
                </button>
            </Toolbar>
            {modal.view ? (
                <ModalBase modalType={modal.type} payload={{ ...modal.payload, url: 'enum' }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} />
            ) : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumsTableConfig} data={enums} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Enums;
