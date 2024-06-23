import Link from 'next/link';
import FullPage from '../../../../components/layout/page/fullPage';
import Toolbar from '../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useLogTemplates } from '../../../../components/maintenance/logs/logsManagement/useLogsManagement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../components/store/store';
import { useRouter } from 'next/router';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DataTable from '../../../../components/dataTable/dataTable';
import { useState } from 'react';
import ModalBase from '../../../../components/layout/modal/modal';

const LogTemplates = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions); // todo permissions for logs
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/maintenance');
    }
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { logTemplates, loading, error, reload } = useLogTemplates(currentFacility);
    const [modal, setModal] = useState({ view: false, type: '' });

    const logTemplatesTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
            { id: 'next_due_date', name: 'Next Due', type: 'date', search: true, order: true },
            { id: 'up_to_date', name: 'Up to Date', type: 'tick', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] }
        ],
        searchable: true,
        linkColPrefix: '/maintenance/logs/logsManagement/',
        modalType: 'LogTemplate',
        deleteUrl: 'maintenance/logs/log-templates',
        idPointer: 'id',
        namePointer: 'title',
        reload: reload,
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/maintenance/logs" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Logs</p>
                </Link>
                <button onClick={() => setModal({ view: true, type: 'addEditLogTemplate' })} className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>Create Log Template
                </button>
            </Toolbar>
            {modal.view ? <ModalBase modalType={modal.type} payload={{ id: 0, name: '' }} closeModal={() => [setModal({ view: false, type: '' }), reload()]} /> : ''}
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={logTemplatesTableConfig} data={logTemplates} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default LogTemplates;
