import Downtime from '../components/dashboard/downtime';
import JobsOpen from '../components/dashboard/jobsOpen';
import JobsCompleted from '../components/dashboard/jobsCompleted';
import JobsRaised from '../components/dashboard/jobsRaised';
import LostRevenue from '../components/dashboard/lostRevenue';
import SparesCosts from '../components/dashboard/sparesCosts';
import FullPage from '../components/page/fullPage';
import Toolbar from '../components/page/toolbar';
import BreakdownVsPlannned from '../components/dashboard/breakdownVsPlanned';
import IncidentsOfNoSpares from '../components/dashboard/incidentsOfNoSpares';
import RevenueLostByAsset from '../components/dashboard/RevenueLostByAsset';
import { useSelector } from 'react-redux';
import { RootState } from '../components/store/store';
import { useDashboardJobs } from '../components/dashboard/dataHooks/useDashboardJobs';
import { useDashboardSpares } from '../components/dashboard/dataHooks/useDashboardSpares';

const Dashboard = () => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    // lost revenue hook
    // jobs hook
    const { raised, completed, open, planned, jobLoading, jobError } = useDashboardJobs(currentProperty);
    // spares hook
    const { sparesCost, sparesLoading, sparesError } = useDashboardSpares(currentProperty);

    return (
        <FullPage>
            <Toolbar></Toolbar>
            <div className="my-4 h-full w-full flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-2 ">
                <LostRevenue />
                <SparesCosts data={sparesCost} loading={sparesLoading} error={sparesError} />
                <IncidentsOfNoSpares />
                <Downtime />
                <JobsRaised data={raised} loading={jobLoading} error={jobError}/>
                <JobsCompleted data={completed} loading={jobLoading} error={jobError}/>
                <RevenueLostByAsset />
                <JobsOpen data={open} loading={jobLoading} error={jobError}/>
                <BreakdownVsPlannned data={planned} loading={jobLoading} error={jobError}/>
            </div>
        </FullPage>
    );
};

export default Dashboard;
