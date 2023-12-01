import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useJobs } from '../../components/jobs/index/useJobs';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { GlobalDebug } from '../../components/logs/globalDebug';
import { useRouter } from 'next/router';

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'urgency', name: 'Urgency', type: 'string', search: true, order: true },
        { id: 'required_comp_date', name: 'Required Completion Date', type: 'date', search: true, order: true },
        { id: 'status', name: 'Current Status', type: 'string', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'tick', search: true, order: true },
        { id: 'comp_date', name: 'Completed Date', type: 'date', search: true, order: true },
        { id: 'reporter', name: 'Reporter', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/jobs/',
};

const Jobs = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.jobs?.view && !isAdmin) {
        router.push('/');
    }

    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { jobs, loading, error } = useJobs({ currentProperty });
    GlobalDebug('Jobs Index', [['Jobs list', jobs]]);

    return (
        <FullPage>
            <Toolbar>
                <Link href="/assets" className="tLink">
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
