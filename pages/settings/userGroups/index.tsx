import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import ModalBase from '../../../components/modal/modal';
import { useUserGroups } from '../../../components/settings/userGroups/index/useUserGroups';
import DataTable from '../../../components/dataTable/dataTable';

const UserGroups = () => {
    const { userGroups, loading, error, reload } = useUserGroups();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const userGroupsTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'string', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'UserGroup',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };

    const addUserGroup = () => {
        setModal({ view: true, type: 'addEditUserGroup', payload: { id: 0, name: '' } });
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/settings" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addUserGroup} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add User Group
                </button>
            </div>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={userGroupsTableConfig} data={userGroups} />
            </LoadingNoDataError>
        </div>
    );
};

export default UserGroups;
