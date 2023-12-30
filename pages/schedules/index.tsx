import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useSchedules } from '../../components/schedules/index/useSchedules';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';
import DataTable from '../../components/dataTable/dataTable';
import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { GlobalDebug } from '../../components/debug/globalDebug';
import { useRouter } from 'next/router';

const schedulesTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
        { id: 'next_due_date', name: 'Next Due', type: 'date', search: true, order: true },
        { id: 'up_to_date', name: 'Up to Date', type: 'tick', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/schedules/',
};

const Schedules = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/');
    }

    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const { schedules, loading, error } = useSchedules({ currentProperty });
    GlobalDebug('Schedules Index', [['Schedules list', schedules]]);

    return (
        <FullPage>
            <Toolbar>
                <Link href="/assets" className="tLink">
                    <div className="text-2xl mr-1 pb-1">+</div>Create PM Schedule
                </Link>
            </Toolbar>
            <LoadingNoDataError loading={loading} error={error}>
                <DataTable config={schedulesTableConfig} data={schedules} />
            </LoadingNoDataError>
        </FullPage>
    );
};

export default Schedules;