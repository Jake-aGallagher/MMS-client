import FullPage from '../components/layout/page/fullPage';
import Toolbar from '../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../components/store/store';
import RevenueLostByAsset from '../components/charts/dashboard/RevenueLostByAsset';
import { useDashboardJobs } from '../components/charts/dashboard/dataHooks/useDashboardJobs';
import { useDashboardRevenues } from '../components/charts/dashboard/dataHooks/useDashboardRevenues';
import { useDashboardSpares } from '../components/charts/dashboard/dataHooks/useDashboardSpares';
import Downtime from '../components/charts/dashboard/downtime';
import IncidentsOfNoSpares from '../components/charts/dashboard/incidentsOfNoSpares';
import JobsCompleted from '../components/charts/dashboard/jobsCompleted';
import JobsOpen from '../components/charts/dashboard/jobsOpen';
import JobsRaised from '../components/charts/dashboard/jobsRaised';
import LostRevenue from '../components/charts/dashboard/lostRevenue';
import SparesCosts from '../components/charts/dashboard/sparesCosts';
import BreakdownVsPlannned from '../components/charts/dashboard/breakdownVsPlanned';

const Dashboard = () => {
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const { revenue, downtime, assetRevenue, revenuesLoading, revenuesError } = useDashboardRevenues(currentFacility);
    const { raised, completed, open, planned, jobLoading, jobError } = useDashboardJobs(currentFacility);
    const { sparesCost, missingSpares, sparesLoading, sparesError } = useDashboardSpares(currentFacility);

    return (
        <FullPage>
            <Toolbar></Toolbar>
            <div className="my-4 h-full w-full flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-2 ">
                <LostRevenue data={revenue} loading={revenuesLoading} error={revenuesError} />
                <SparesCosts data={sparesCost} loading={sparesLoading} error={sparesError} />
                <IncidentsOfNoSpares data={missingSpares} loading={sparesLoading} error={sparesError} />
                <Downtime data={downtime} loading={revenuesLoading} error={revenuesError} />
                <JobsRaised data={raised} loading={jobLoading} error={jobError} />
                <JobsCompleted data={completed} loading={jobLoading} error={jobError} />
                <RevenueLostByAsset data={assetRevenue} loading={revenuesLoading} error={revenuesError} />
                <JobsOpen data={open} loading={jobLoading} error={jobError} />
                <BreakdownVsPlannned data={planned} loading={jobLoading} error={jobError} />
            </div>
        </FullPage>
    );
};

export default Dashboard;
