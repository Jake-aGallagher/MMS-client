import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useUsers } from '../../../components/settings/users/index/useUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import ModalBase from '../../../components/modal/modal';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useRouter } from 'next/router';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const Users = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.users?.view && !isAdmin) {
        router.push('/settings');
    }

    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { users, loading, error, reload } = useUsers(currentProperty);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const usersTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'username', name: 'Username', type: 'string', search: true, order: true },
            { id: 'first_name', name: 'First Name', type: 'string', search: true, order: true },
            { id: 'last_name', name: 'Last Name', type: 'string', search: true, order: true },
            { id: 'user_group_name', name: 'User Group', type: 'string', search: true, order: true },
        ],
        searchable: true,
        modalType: 'User',
        idPointer: 'id',
        namePointer: 'username',
        reload: reload,
    };
    if (permissions.users?.manage || isAdmin) {
        usersTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addUser = () => {
        setModal({ view: true, type: 'addEditUser', payload: { id: 0, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                {permissions.users?.manage || isAdmin ? (
                    <button onClick={addUser} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add User
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={usersTableConfig} data={users} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Users;
