import FullPage from '../../../components/layout/page/fullPage';
import Toolbar from '../../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/navigation';

const QualityControl = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.qualityControl?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <div className="mb-2">pareto analysis - 80/20 rule, 80% of the problems are caused by 20% of the causes.</div>
                <div className="mb-2">fishbone diagram - cause and effect diagram.</div>
                <div className="mb-2">control charts - used to monitor the stability of a process over time.</div>
                <div className="mb-2">scatter diagrams - used to show the relationship between two variables.</div>
                <div className="mb-2">histograms - used to show the distribution of data.</div>
                <div className="mb-2">flow charts - used to show the sequence of steps in a process.</div>
                <div className="mb-2">check sheets - used to record data in a structured way</div>
            </FullPage>
        </>
    );
};

export default QualityControl;
