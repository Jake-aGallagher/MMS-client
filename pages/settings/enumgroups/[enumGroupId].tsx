import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useEnumValues } from '../../../components/settings/enumgroups/enumValues/index/useEnumValues';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const EnumValues = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.enums?.view && !isAdmin) {
        router.push('/settings');
    }

    const enumGroupId = parseInt(router.asPath.split('/')[3]);
    const { enumValues, loading, error, reload } = useEnumValues(enumGroupId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; groupId: number } }>({
        view: false,
        type: '',
        payload: { id: 0, name: '', groupId: enumGroupId },
    });

    const enumValuesTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
        ],
        searchable: true,
        modalType: 'EnumValue',
        deleteUrl: 'enumvalues',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };
    if (permissions.enums?.manage || isAdmin) {
        enumValuesTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addEnumGroup = () => {
        setModal({ view: true, type: 'addEditEnumValue', payload: { id: 0, name: '', groupId: enumGroupId } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings/enumgroups" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Enum Groups</p>
                </Link>
                {permissions.enums?.manage || isAdmin ? (
                    <button onClick={addEnumGroup} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Enum Value
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? (
                <ModalBase
                    modalType={modal.type}
                    payload={{ ...modal.payload }}
                    closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '', groupId: enumGroupId } }), reload()]}
                />
            ) : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={enumValuesTableConfig} data={enumValues} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default EnumValues;
