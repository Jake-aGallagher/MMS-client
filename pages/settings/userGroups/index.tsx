import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import ModalBase from '../../../components/modal/modal';
import { useUserGroups } from '../../../components/settings/userGroups/index/useUserGroups';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';

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
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                <button onClick={addUserGroup} className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add User Group
                </button>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={userGroupsTableConfig} data={userGroups} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default UserGroups;
