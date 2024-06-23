import { useState } from 'react';
import { useUserGroups } from '../../../components/settings/userGroups/index/useUserGroups';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalBase from '../../../components/layout/modal/modal';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const Permissions = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.userGroups?.view && !isAdmin) {
        router.push('/settings');
    }

    const { userGroups, loading, error, reload } = useUserGroups();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const permissionsTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        ],
        searchable: true,
        modalType: 'Permissions',
        idPointer: 'id',
        namePointer: 'name',
        reload: reload,
    };
    if (permissions.userGroups?.manage || isAdmin) {
        permissionsTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit'] });
    }

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={modal.payload} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={permissionsTableConfig} data={userGroups} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Permissions;
