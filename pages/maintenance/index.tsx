import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import JobsCard from '../../components/maintenance/index/jobsCard';
import PMsCard from '../../components/maintenance/index/pmsCard';
import AssetsCard from '../../components/maintenance/index/assetsCard';
import LogsCard from '../../components/maintenance/index/logsCard';
import IndexWrapper from '../../components/layout/indexWrapper';

const Maintenance = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.maintenance?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <IndexWrapper>
                    <AssetsCard />
                    <JobsCard />
                    <PMsCard />
                    <LogsCard />
                </IndexWrapper>
            </FullPage>
        </>
    );
};

export default Maintenance;
