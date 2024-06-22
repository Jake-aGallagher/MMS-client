import FullPage from '../../components/page/fullPage';
import Toolbar from '../../components/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import JobsCard from '../../components/maintenance/index/jobsCard';
import PMsCard from '../../components/maintenance/index/pmsCard';
import AssetsCard from '../../components/maintenance/index/assetsCard';
import LogsCard from '../../components/maintenance/index/logsCard';

const SparesManagement = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.supply?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <div>
                    <JobsCard />
                    <PMsCard />
                    <AssetsCard />
                    <LogsCard />
                </div>
            </FullPage>
        </>
    );
};

export default SparesManagement;
