import Link from 'next/link';
import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/router';
import { useLogs } from '../../../components/maintenance/logs/useLogs';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';

const Logs = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.logs?.view && !isAdmin) {
        router.push('/maintenance');
    }

    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { logs, loading, error, reload } = useLogs({ currentFacility });

    const LogTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'created', name: 'Last Completed', type: 'date', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
            { id: 'required_comp_date', name: 'Required Completion Date', type: 'date', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/maintenance/logs/',
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href="/maintenance" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Maintenance</p>
                </Link>
                <Link href="/maintenance/logs/logsManagement" className="tLink">
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
