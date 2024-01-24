import Link from 'next/link';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/router';
import { useLogs } from '../../components/logs/useLogs';
import { GlobalDebug } from '../../components/debug/globalDebug';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';

const Logs = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.logs?.view && !isAdmin) {
        router.push('/');
    }

    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { logs, loading, error, reload } = useLogs({ currentProperty });
    GlobalDebug('Logs Index', [['Logs list', logs]]);

    const LogTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'required_comp_date', name: 'Required Completion Date', type: 'date', search: true, order: true },
            { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
            { id: 'comp_date', name: 'Completed Date', type: 'date', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/logs/',
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/logs/logsManagement" className="tLink">
                    <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                    Logs Management
                </Link>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={LogTableConfig} data={logs} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Logs;
