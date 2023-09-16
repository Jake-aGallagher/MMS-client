import { useState } from 'react';
import { useUserGroups } from '../../../components/settings/userGroups/index/useUserGroups';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalBase from '../../../components/modal/modal';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../components/dataTable/dataTable';

const Permissions = () => {
    const { userGroups, loading, error, reload } = useUserGroups();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const permissionsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit'] },
        ],
        searchable: true,
        modalType: 'Permissions',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </div>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={permissionsTableConfig} data={userGroups} />
            </LoadingNoDataError>
        </div>
    );
};

export default Permissions;
