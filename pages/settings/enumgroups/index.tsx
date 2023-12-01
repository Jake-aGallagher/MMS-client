import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEnumGroups } from '../../../components/settings/enumgroups/index/useEnumGroups';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/router';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const EnumGroups = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.enums?.view && !isAdmin) {
        router.push('/settings');
    }

    const { enumGroups, loading, error, reload } = useEnumGroups();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const enumGroupsTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'value', name: 'Group', type: 'string', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/settings/enumgroups/',
        modalType: 'EnumGroup',
        deleteUrl: 'enumgroups',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };
    if (permissions.enums?.manage || isAdmin) {
        enumGroupsTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addEnumGroup = () => {
        setModal({ view: true, type: 'addEditEnumGroup', payload: { id: 0, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                {permissions.enums?.manage || isAdmin ? (
                    <button onClick={addEnumGroup} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Enum Group
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumGroupsTableConfig} data={enumGroups} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default EnumGroups;
