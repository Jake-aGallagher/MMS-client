import FullPage from '../../components/layout/page/fullPage';
import Toolbar from '../../components/layout/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import { useRouter } from 'next/navigation';
import IndexWrapper from '../../components/layout/indexWrapper';
import RisksCard from '../../components/compliance/index/risksCard';
import CompliancePoliciesCard from '../../components/compliance/index/compliancePoliciesCard';
import ComplianceTrainingCard from '../../components/compliance/index/complianceTrainingCard';
import VulnerabilitiesCard from '../../components/compliance/index/vulnerabilitiesCard';
import IncidentsCard from '../../components/compliance/index/incidentsCard';
import ReviewsCard from '../../components/compliance/index/reviewsCard';
import ComplianceAuditsCard from '../../components/compliance/index/complianceAuditsCard';

const Compliance = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.compliance?.view && !isAdmin) {
        router.push('/');
    }

    return (
        <>
            <FullPage>
                <Toolbar></Toolbar>
                <IndexWrapper>
                    <RisksCard />
                    <CompliancePoliciesCard />
                    <ComplianceTrainingCard />
                    <VulnerabilitiesCard />
                    <IncidentsCard />
                    <ReviewsCard />
                    <ComplianceAuditsCard />
                </IndexWrapper>
            </FullPage>
        </>
    );
};

export default Compliance;
