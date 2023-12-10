import Downtime from '../components/dashboard/downtime';
import JobsOpen from '../components/dashboard/jobsOpen';
import JobsCompleted from '../components/dashboard/jobsCompleted';
import JobsRaised from '../components/dashboard/jobsRaised';
import LostRevenue from '../components/dashboard/lostRevenue';
import SparesCosts from '../components/dashboard/sparesCosts';
import FullPage from '../components/page/fullPage';
import Toolbar from '../components/page/toolbar';
import PlannedUnplanned from '../components/dashboard/plannedUnplanned';
import IncidentsOfNoSpares from '../components/dashboard/incidentsOfNoSpares';
import RevenueLostByAsset from '../components/dashboard/RevenueLostByAsset';

const Dashboard = () => {
    return (
        <FullPage>
            <Toolbar></Toolbar>
            <div className="my-4 h-full w-full flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-2 ">
                <LostRevenue />
                <JobsRaised />
                <JobsCompleted />
                <Downtime />
                <JobsOpen />
                <PlannedUnplanned />
                <SparesCosts />
                <IncidentsOfNoSpares />
                <RevenueLostByAsset />
            </div>
        </FullPage>
    );
};

export default Dashboard;
