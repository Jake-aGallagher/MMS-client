import Link from 'next/link';
import StockWarnings from '../../../components/spares/sparesManagement/currentStockWarnings';
import SparesNotes from '../../../components/spares/sparesManagement/sparesNotes/index/sparesNotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DeliveriesCard from '../../../components/spares/sparesManagement/deliveriesCard';
import SuppliersCard from '../../../components/spares/sparesManagement/suppliersCard';
import FullPage from '../../../components/page/fullPage';
import Toolbar from '../../../components/page/toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import { useRouter } from 'next/navigation';

const SparesManagement = () => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const router = useRouter();
    if (!permissions.sparesManagement?.view && !isAdmin) {
        router.push('/spares');
    }

    return (
        <>
            <FullPage>
                <Toolbar>
                    <Link href="/spares" className="tLink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares</p>
                    </Link>
                </Toolbar>
                <div>
                    <StockWarnings />
                    {permissions.sparesManagement?.view || isAdmin ? (
                        <>
                            <DeliveriesCard />
                            <SuppliersCard />
                            <SparesNotes />
                        </>
                    ) : null}
                </div>
            </FullPage>
        </>
    );
};

export default SparesManagement;
