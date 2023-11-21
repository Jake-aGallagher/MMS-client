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

const EnumValues = () => {
    const params = useRouter();
    const enumGroupId = parseInt(params.asPath.split('/')[3]);
    const { enumValues, loading, error, reload } = useEnumValues(enumGroupId);
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string; groupId: number } }>({
        view: false,
        type: '',
        payload: { id: 0, name: '', groupId: enumGroupId },
    });

    const enumValuesTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] },
        ],
        searchable: true,
        modalType: 'EnumValue',
        deleteUrl: 'enumValues',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };

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
                <button onClick={addEnumGroup} className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>
                    Add Enum Value
                </button>
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
