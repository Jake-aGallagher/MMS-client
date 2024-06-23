import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useJobs } from '../../../components/maintenance/jobs/index/useJobs';
import LoadingNoDataError from '../../../components/loading/loadingNoDataError';
import DataTable from '../../../components/dataTable/dataTable';
import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'ID', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'urgency', name: 'Urgency', type: 'string', search: true, order: true },
        { id: 'required_comp_date', name: 'Required Completion Date', type: 'date', search: true, order: true },
        { id: 'status', name: 'Current Status', type: 'string', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        { id: 'comp_date', name: 'Completed Date', type: 'date', search: true, order: true },
        { id: 'reported_by', name: 'Reported By', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/maintenance/jobs/',
};

const Jobs = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/maintenance');
    }

    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { jobs, loading, error } = useJobs({ currentFacility });

    return (
        <FullPage>
            <Toolbar>
            <Link href="/maintenance" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Maintenance</p>
                </Link>
                <Link href="/maintenance/assets" className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>Create Job
                </Link>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={jobTableConfig} data={jobs} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Jobs;
