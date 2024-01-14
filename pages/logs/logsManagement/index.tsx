import Link from 'next/link';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useLogTemplates } from '../../../components/logs/logsManagement/useLogsManagement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/router';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import { useState } from 'react';
import ModalBase from '../../../components/modal/modal';

const LogTemplates = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions); // todo permissions for logs
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/');
    }
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { logTemplates, loading, error, reload } = useLogTemplates(currentProperty);
    const [modal, setModal] = useState({ view: false, type: '' });

    const logTemplatesTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
            { id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] }
        ],
        searchable: true,
        linkColPrefix: '/logs/logsManagement/',
        modalType: 'LogTemplate',
        deleteUrl: 'logs/log-templates',
        idPointer: 'id',
        namePointer: 'title',
        reload: reload,
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/logs" className="tLink">
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
