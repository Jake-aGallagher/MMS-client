import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import IndexWrapper from '../../components/layout/indexWrapper';
import StandardsCard from '../../components/quality-control/index/standardsCard';
import PolicyCard from '../../components/quality-control/index/policyCard';
import RecordsCard from '../../components/quality-control/index/recordsCard';
import ProceduresCard from '../../components/quality-control/index/proceduresCard';
import InstructionsCard from '../../components/quality-control/index/instructionsCard';
import AnalysisCard from '../../components/quality-control/index/analysisCard';

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
                <IndexWrapper>
                    <StandardsCard />
                    <PolicyCard />
                    <ProceduresCard />
                    <InstructionsCard />
                    <RecordsCard />
                    <AnalysisCard />
                </IndexWrapper>
            </FullPage>
        </>
    );
};

export default QualityControl;
