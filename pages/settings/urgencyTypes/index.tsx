import { useState } from 'react';
import ModalBase from '../../../components/layout/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import { useUrgencyTypes } from '../../../components/settings/urgencyTypes/index/useUrgencyType';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { DataTableConfig } from '../../../components/dataTable/types/configType';

const UrgencyTypes = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.enums?.view && !isAdmin) {
        router.push('/settings');
    }

    const { urgencyTypes, loading, error, reload } = useUrgencyTypes();
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: { id: number; name: string } }>({ view: false, type: '', payload: { id: 0, name: '' } });

    const urgencyTypesTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'number', search: true, order: true },
            { id: 'value', name: 'Value', type: 'string', search: true, order: true },
            { id: 'urgency_number', name: 'Urgency Time', type: 'number', search: true, order: true },
            { id: 'urgency_period', name: 'Urgency Period', type: 'string', search: true, order: true },
            { id: 'list_priority', name: 'Order', type: 'number', search: true, order: true },
        ],
        searchable: true,
        modalType: 'UrgencyType',
        deleteUrl: 'maintenance/urgencytypes',
        idPointer: 'id',
        namePointer: 'value',
        reload: reload,
    };
    if (permissions.enums?.manage || isAdmin) {
        urgencyTypesTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    const addUrgencyType = () => {
        setModal({ view: true, type: 'addEditUrgencyType', payload: { id: 0, name: '' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/settings" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Settings</p>
                </Link>
                {permissions.enums?.manage || isAdmin ? (
                    <button onClick={addUrgencyType} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Urgency Type
                    </button>
                ) : null}
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ ...modal.payload }} closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '' } }), reload()]} /> : null}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={urgencyTypesTableConfig} data={urgencyTypes} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default UrgencyTypes;
