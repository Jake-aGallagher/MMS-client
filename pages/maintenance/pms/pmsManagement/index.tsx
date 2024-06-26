import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../components/store/store';
import { usePmSchedules } from '../../../../components/maintenance/pms/pmsManagement/usePmSchedules';
import LoadingNoDataError from '../../../../components/loading/loadingNoDataError';
import DataTable from '../../../../components/dataTable/dataTable';
import FullPage from '../../../../components/layout/page/fullPage';
import Toolbar from '../../../../components/layout/page/toolbar';
import { useRouter } from 'next/router';
import { DataTableConfig } from '../../../../components/dataTable/types/configType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Schedules = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.schedules?.view && !isAdmin) {
        router.push('/maintenance');
    }
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { schedules, loading, error, reload } = usePmSchedules({ currentFacility });

    const schedulesTableConfig: DataTableConfig = {
        headers: [
            { id: 'id', name: 'ID', type: 'link', search: true, order: true },
            { id: 'title', name: 'Title', type: 'string', search: true, order: true },
            { id: 'asset', name: 'Asset', type: 'string', search: true, order: true },
            { id: 'type', name: 'Type', type: 'string', search: true, order: true },
            { id: 'frequency', name: 'Frequency', type: 'string', search: true, order: true },
            { id: 'next_due_date', name: 'Next Due', type: 'date', search: true, order: true },
            { id: 'up_to_date', name: 'Up to Date', type: 'tick', search: true, order: true },
        ],
        searchable: true,
        linkColPrefix: '/maintenance/pms/pmsManagement/',
        modalType: 'PmSchedule',
        deleteUrl: 'maintenance/pms/schedules',
        idPointer: 'id',
        namePointer: 'title',
        reload: reload,
    };

    if (permissions.schedules?.manage || isAdmin) {
        schedulesTableConfig.headers.push({ id: 'tools', name: 'Tools', type: 'tools', search: false, order: false, functions: ['edit', 'delete'] });
    }

    return (
        <FullPage>
            <Toolbar>
                <Link href="/maintenance/pms" className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to PMs</p>
                </Link>
                <Link href="/maintenance/assets" className="tLink">
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
