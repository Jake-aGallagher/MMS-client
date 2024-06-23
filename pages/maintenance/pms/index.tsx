import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { GlobalDebug } from '../../../components/debug/globalDebug';
import { useRouter } from 'next/router';
import { DataTableConfig } from '../../../components/dataTable/types/configType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { usePms } from '../../../components/maintenance/pms/usePms';

const Pms = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/maintenance');
    }
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { pms, loading, error, reload } = usePms({ currentFacility });
    GlobalDebug('PM Index', [['PM list', pms]]);

    const pmsTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
            { id: 'created', name: 'Created', type: 'date', search: true, order: true },
            { id: 'required_comp_date', name: 'Due', type: 'date', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/maintenance/pms/',
        modalType: 'Pms',
        deleteUrl: 'maintenance/pms',
        idPointer: 'id',
        namePointer: 'title',
        reload: reload,
    };

    return (
        <FullPage>
            <Toolbar>
            <Link href='/maintenance' className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Maintenance</p>
                </Link>
                <Link href="/maintenance/pms/pmsManagement" className="tLink">
                    <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                    PM Management
                </Link>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={pmsTableConfig} data={pms} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Pms;
